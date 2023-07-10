var fs = require('fs')
const fse = require('fs-extra');
var path = require('path')

$$ = {
    delimeter: '︙',
    create: (baseFile, outputFilename) => `$$.createInner('${baseFile}', '${outputFilename}', function() {return eval(arguments[0])})`,
    createInner: (baseFile, outputFilename, scopeBasedEval) => {
        let content = fs.readFileSync(baseFile, 'utf8').split($$.delimeter)
        return new MultiploWorker(content, outputFilename, scopeBasedEval, baseFile).execute()

    },
    clone: function (srcPath, outputPath) {fse.copySync(srcPath, outputPath, { overwrite: true })},
    clear: function (path) {fse.emptyDirSync(path)}
}
module.exports = $$

class InterruptWorker extends Error {
    constructor(message, returnValueFunc) {
        super(message)
        this.name = 'InterruptWorker'
        this.returnValueFunc = returnValueFunc
    }

    get returnValue() {return this.returnValueFunc()}
}

class MultiploWorker {
    constructor(sourceContent, outputFilename, scopeBasedEval, identifier) {
        this.sourceContent = [...sourceContent]
        this.content = [...sourceContent]
        this.outputFilename = outputFilename
        this.scopeBasedEval = scopeBasedEval
        this.identifier = identifier

        this.proxy = new MultiploProxy(this)
        this.isSilent = false
    }
    execute() {
        try {
            for(let i = 1; i<this.content.length; i+=2) {
                try {this.content[i] = this.runCell(this.content[i], i)}
                catch (e) {throw this.constructError(e, i)} 
            }
            this.writeFile()
            return [this.outputFilename]
        } catch (e) {
            if (e instanceof InterruptWorker) return e.returnValue
            else throw e
        }
    }
    runCell(code, index) {
        let proxy = new MultiploProxy(this, index)
        let thisOutput = this.scopeBasedEval.bind(proxy)(code)
        return (proxy.isSilent?'':thisOutput)
    }
    writeFile() {
        fs.mkdirSync(path.dirname(this.outputFilename), { recursive: true })
        fs.writeFileSync(this.outputFilename, this.content.join(''))
    }
    constructError(e, index) {
        let lineNumber = this.sourceContent.slice(0, index).join('').split('\n').length
        let lineCount = this.sourceContent[index].split('\n').length
        let lineMessage = lineCount > 1 ? 'lines ' + lineNumber + '-' + (lineNumber + lineCount - 1) : 'line ' + lineNumber

        e.message = e.message + '\n    in ' + this.identifier + ', ' + lineMessage
        return e
    }

}
class MultiploProxy {
    constructor(worker, cellIndex) {
        this.__worker = worker
        this.__cellIndex = cellIndex
    }

    get outputFilename() {return this.__worker.outputFilename}
    silence() {this.isSilent = true}
    split(paths) {
        let executeSplit = () => {
            let alreadyParsed = this.__worker.content.slice(0, this.__cellIndex).join('')
            let returnValue = []
            for(const [key, value] of Object.entries(paths)) {
                let splitWorker = new MultiploWorker(
                    [alreadyParsed+value+(this.__worker.content[this.__cellIndex+1]||''), ...this.__worker.content.slice(this.__cellIndex+2)], 
                    this.outputFilename.replace('.', key+'.'),
                    this.__worker.scopeBasedEval, 
                    this.__worker.identifier+":"+key
                )
                returnValue.push(...splitWorker.execute())
            }
            return returnValue
        }
        throw new InterruptWorker('split', executeSplit)
    }
}
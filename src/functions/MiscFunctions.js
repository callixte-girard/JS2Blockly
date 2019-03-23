export class MiscFunctions {

    static splitLineByLine(toSplit) {

        return toSplit.split(/\r?\n/)
    }

    static patchUpStringArrayIntoOneBigString(stringArray, withSpaces) {

        let big_string = ""

        for (let str in stringArray) {
            big_string += str
            if (withSpaces) {
                big_string += " "
            }
        }

        return big_string
    }
}
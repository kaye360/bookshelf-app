import { isString } from "./validation"

export class StringUtils {

    public static capitalize(string: any) {

        if( !isString(string) || !string || string === '') {
            return ''
        }

        return string[0].toUpperCase() + string.slice(1)
    }
}
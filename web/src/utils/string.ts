
export class StringUtils {

    public static capitalize(string: any) {

        if( typeof string !== 'string' || !string || string === '') {
            return ''
        }

        return string[0].toUpperCase() + string.slice(1)
    }
}
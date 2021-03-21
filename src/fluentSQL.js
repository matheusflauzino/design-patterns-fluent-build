export default class FluentSQLBuilder {
    #database = []
    #limit = 0
    #select = []
    #where = []
    #orderBy = ''

    constructor({database}) {
        this.#database = database
    }

    static for(database) {
        return new FluentSQLBuilder({database})
    }

    limit(max) {
        this.#limit = max

        return this
    }

    select(props) {
        this.#select = props
        return this
    }

    where(query) {
        const [[prop,selectedValue]] = Object.entries(query)
        const whereFilter = selectedValue instanceof RegExp ? selectedValue : new RegExp(selectedValue)
        this.#where.push({prop, filter: whereFilter})
        return this
    }

    orderBy(field) {
        this.#orderBy = field
    }

    #performLimit(results) {
        return this.#limit && results.length === this.#limit
    }

    #performWhere(item) {
        for(const { filter, prop } of this.#where) {
            if(!filter.test(item[prop])) return false
        }

        return true
    }

    build() {
        const results = []
        for(const item of this.#database) {
            if(!this.#performWhere(item)) continue;
            results.push(item)

            if(this.#performLimit(results)) break;
        }


        return results
    }
}
import { expect, describe, test} from '@jest/globals'
import FluentSQLBuilder from '../src/fluentSQL'


const data = [
    {
        id: 0,
        name: 'matheusflauzino',
        category: 'developer'
    },
    {
        id: 1,
        name: 'mariazinha',
        category: 'developer'

    },
    {
        id: 2,
        name: 'joao',
        category: 'manager'

    }
]

describe('Test Suit for FluentSQL Builder', () => {
    test('#for should return a FluentSQLBuilder instance', () => {
        const result = FluentSQLBuilder.for(data)
        const expected = new FluentSQLBuilder({database: data})
        expect(result).toStrictEqual(expected)
    })

    test('#build should return the empty object instance', () => {
        const result = FluentSQLBuilder.for(data).build()
        const expected = data
        expect(result).toStrictEqual(expected)
    })

    test('#limit given a colletion it should limit results', () => {
        const result = FluentSQLBuilder.for(data).limit(1).build()
        const expected = [data[0]]
        expect(result).toStrictEqual(expected)
    })

    test('#where given a colletion it should filter data', () => {
        const result = FluentSQLBuilder.for(data).where({
            category: /^dev/
        }).build()

        const expected = data.filter(({category }) => category.slice(0,3) === 'dev')

        expect(result).toStrictEqual(expected)

    })

    test('#select given a collection it should return only specifc fields', () => {
        const result = FluentSQLBuilder.for(data).select(['name','category']).build()
        const expected = data.map(({name,category }) => ({name,category}))

        expect(result).toStrictEqual(expected)
    })

    test.todo('#orderBy given a colletion it should order results by field')

    test.todo('pipeline')
})
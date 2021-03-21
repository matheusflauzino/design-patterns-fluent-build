import data from './../database/data.json'

import FluentSQLBuilder from './fluentSQL.js'

const result = FluentSQLBuilder.for(data)
.select(['name','company','category','phone','registered'])
.where({registered: /^(2020|2019)/})
.where({category: /^(security|developer|quality assurance)$/})
.where({phone: /\((852|860|810)\)/})
.orderBy('category')
.limit(2)
.build();

console.table(result);
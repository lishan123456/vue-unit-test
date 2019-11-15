'use strict'

/*
*   有A~I9种类型，一题两种选择27题
*   请问随机1000次出现的情况
*   @param  1.  E:B
            2.  G:A
            3.  C:E
            4.  H:I
            5.  F:E
            6.  B:A
            7.  G:D
            8.  E:G
            9.  C:I
            10. E:A
            11. H:G
            12. B:D
            13. F:C
            14. E:I
            15. H:D
            16. B:G
            17. A:F
            18. C:H
            19. B:I
            20. F:D
            21. G:C
            22. H:A
            23. B:F
            24. C:D
            25. H:I
            26. A:I
            27. H:D
*/

const _ = require('lodash')

const choices = [
    { a: 4, b: 1 },
    { a: 6, b: 0 },
    { a: 2, b: 4 },
    { a: 7, b: 8 },
    { a: 5, b: 4 },
    { a: 1, b: 0 },
    { a: 6, b: 3 },
    { a: 4, b: 6 },
    { a: 2, b: 8 },
    { a: 4, b: 0 },
    { a: 7, b: 6 },
    { a: 1, b: 3 },
    { a: 5, b: 2 },
    { a: 4, b: 8 },
    { a: 7, b: 3 },
    { a: 1, b: 6 },
    { a: 0, b: 5 },
    { a: 2, b: 7 },
    { a: 1, b: 8 },
    { a: 5, b: 3 },
    { a: 6, b: 2 },
    { a: 7, b: 0 },
    { a: 1, b: 5 },
    { a: 2, b: 3 },
    { a: 7, b: 8 },
    { a: 0, b: 8 },
    { a: 7, b: 3 },
    { a: 7, b: 4 },
    { a: 6, b: 5 },
    { a: 8, b: 3 },
    { a: 0, b: 2 },
    { a: 7, b: 1 },
    { a: 4, b: 6 },
    { a: 0, b: 3 },
    { a: 8, b: 5 },
    { a: 1, b: 2 },
]

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

function run (num) {
    for (let i = 0; i < num; i ++) {
        const result = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        choices.forEach((item) => {
            const rand = _.sample(['a', 'b'])
            const answer = item[rand]
            result[answer] += 1
        })

        const maxNumber = _.max(result)
        const maxList = result.map((item) => (item === maxNumber) ? item : 0 )
        console.log(JSON.stringify(maxList))
    }
}
export default run;

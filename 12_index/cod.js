db.books.aggregate([
    {

        $bucket: {
            groupBy: '$pageCount',
            boundaries: [100, 200, 300, 400, 500 , 600, 700],
            default: "OTHERS",
            output: {

                'count': {$sum: 1}

            }
        }

    }
])

db.books.aggregate([
    {
        $bucketAuto: {
            groupBy: '$categories',
            buckets: 3
        }
    }
])

db.books.aggregate([
    {$sort: {pageCount: 1}}
])

db.books.aggregate([
    {$sort: { pageCount: -1}},
    {$limit: 3}
])

db.books.aggregate([
    {$sort: {pageCount: -1}},
    {$match: {authors: 'Gavin King'}},
    {$limit: 3}
])

db.books.aggregate([
    {$match: { categories: 'Java', pageCount: {$gt: 800}}},
    {$limit: 5},
    {$out: 'BigJavaBooks'}
])

db.books.aggregate([
    {$match: {authors: 'Gavin King'}},
    {$sort: {pageCount: -1}},
    {$limit: 3},
    {$project: {title: 1, pageCount: 1}}
])

db.books.aggregate([
    {$match: {categories: 'Java'}},
    {$sort: {pageCount: 1}},
    {$project: {title: 1, authors:1}},
    {$sample: {size: 10}}
])

db.books.aggregate([
    {$match: {categories: 'Microsoft'}},
    {$sort: {pageCount: 1}},
    {$project: {title:1, authors: 1, pageCount: 1}},
    {$skip: 3},
    {$limit: 5}
])

db.books.aggregate([
    {$unwind: "$categories"},
    {$project: {categories: 1}},
    {$limit: 5}
])

db.books.aggregate([
    {$unwind: '$categories'},
    {$sortByCount: '$categories'}
])

db.books.aggregate([
    {$match: {categories: 'PowerBuilder'}},
    {$sort: { pageCount: -1}},
    {$unset: '_id'}
])

db.books.aggregate([
    {$match: {categories: 'Java', pageCount: {$lt: 500}}},
    {$count: "Contagem"}
])
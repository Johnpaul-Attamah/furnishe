class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? 
            {
                name: {
                    $regex: this.queryString.keyword,
                    $options: 'i'
                }
            } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = {...this.queryString };

        //Remove fields from query
        const removedFields = ['keyword', 'limit', 'page'];
        removedFields.forEach(f => delete queryCopy[f]);

        //Advanced filters
        let queryString = JSON.stringify(queryCopy)
        queryString = queryString
            .replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skipped = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skipped);
        return this;
    }
}

export default APIFeatures;


exports.handler = async (event) => {
    /* Process the list of records and transform them */
    const output = event.records.map((record) => {
        const payload = (Buffer.from(record.data, 'base64')).toString('ascii');
        payload.category = ["IT", "Science", "Physics"][Math.floor(Math.random() * 3)]
        return {
        /* This transformation is the "identity" transformation, the data is left intact */
        recordId: record.recordId,
        result: 'Ok',
        data: (Buffer.from(payload, 'utf8')).toString('base64'),
        };
    });
    console.log(`Processing completed.  Successful records ${output.length}.`);
    return{ records: output };
};

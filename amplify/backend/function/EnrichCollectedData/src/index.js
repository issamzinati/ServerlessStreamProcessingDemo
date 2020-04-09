

exports.handler = async (event) => {
    //console.log(event);
    /* Process the list of records and transform them */
    const output = event.records.map((record) => {
        const payload = (Buffer.from(record.data, 'base64')).toString('utf8');
        const parsed = JSON.parse(payload);
        parsed.category = ["IT", "Science", "Physics"][Math.floor(Math.random() * 3)]
        //console.log(parsed);
        return {
            /* This transformation is the "identity" transformation, the data is left intact */
            recordId: record.recordId,
            result: 'Ok',
            data: (Buffer.from(JSON.stringify(parsed), 'utf8')).toString('base64'),
        };
    });
    console.log(`Processing completed.  Successful records ${output.length}.`);
    return{ records: output };
};

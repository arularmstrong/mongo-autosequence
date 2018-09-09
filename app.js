

var mongoose = require('./mongoose.js');

var seqTemplate = {
    _id: String,
    seq: Number
};

var seqSchema = mongoose.Schema(seqTemplate);

var Seq = mongoose.model('Seq', seqSchema);

var userTemplate = {
    name: String,
    password: String,
    seq: Number
};

var userSchema = mongoose.Schema(userTemplate);

var User = mongoose.model('User', userSchema);

var seqHandle = (err, res) => {
    if (err) throw err;
    else {
        if (!res) {
            var seq = 0;
        } else var seq = res.seq;

        var user = new User({
            name: "Skyra",
            password: "be",
            seq: seq + 1
        });
        user.save(saveHandle);
    }
}

var saveHandle = (err, res) => {
    if (err) throw err;
    else {
        console.log(res);
        Seq.updateOne({
            _id: '1'
        }, {
            $inc: {
                seq: 1
            }
        }, {
            upsert: true
        }, (err) => {
            if (err) throw err;
            console.timeEnd("Time");
            runTest();
        });
    };
}




console.time("Time");
Seq.findOne({
    _id: "1"
}, seqHandle);


/*
    Test scripts
    1: last document value equals Sequence value
    2: total document value equals Sequence value
*/
var runTest = () => {
    User.findOne().sort({
        field: 'asc',
        _id: -1
    }).limit(1).exec((err, res) => {
        if (err) throw err;
        else {
            Seq.findOne().exec((err, data) => {
                if (err) throw err;
                else {
                    if (res.seq == data.seq) console.log("1: pass");
                    else console.log("1: fails");
                }
            });

        };
    });

User.countDocuments({},(err, res) => {
    if (err) throw err;
    else {
        Seq.findOne().exec((err, data) => {
            if (err) throw err;
            else {
                if (res == data.seq) console.log("2: pass");
                else console.log("2: fails");
            }
        });

    };
});
}

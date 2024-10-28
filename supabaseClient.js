const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabaseUrl = 'https://szybtkkwpjrqbphhdtrq.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const hostFile = async (file, filePath) => {
    const { data, error } = await supabase
        .storage
        .from('files')
        .upload(filePath, file.buffer, {
            upsert: false
        })

    if (error) {
        if (error.statusCode === '409') {
            req.session.errors = [{ msg: 'Folder already contains file with that name, please choose different folder or rename the file.' }]
            return res.redirect('/');
        } else {
            const error = new Error('Failed to upload the file')
            error.status = 404
            return next(error);
        }
    } else {
        return data
    }
}

const hostUrl = async (path) => {
    const { data } = await supabase
        .storage
        .from('files')
        .getPublicUrl(path)

    return data.publicUrl;
}

const removeFileFromHost = async (filePath) => {
    const { data, error } = await supabase
        .storage
        .from('files')
        .remove([filePath])

    if (error) {
        return { data: null, error: new Error('Failed to remove file from hosting site.') };
    } else {
        return { data, error: null }
    }
}
module.exports = { hostFile, hostUrl, removeFileFromHost }
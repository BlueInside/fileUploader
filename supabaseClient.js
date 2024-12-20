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

const deleteFolderFromHost = async (folderPath) => {

    try {
        const { data: files, error: listError } = await supabase
            .storage
            .from('files')
            .list(folderPath, {
                limit: 100,
                offset: 0,
            })

        if (listError) {
            throw new Error(`Failed to list files in folder: ${listError.message}`);
        }

        if (files.length === 0) {
            console.log("Folder is empty, no files to delete.");
            return;
        }

        const filePaths = files.map(file => `${folderPath}/${file.name}`);

        const { data, error: deleteError } = await supabase
            .storage
            .from('files')
            .remove(filePaths)

        if (deleteError) {
            throw new Error(`Failed to delete files in folder: ${deleteError.message}`);
        }

        console.log("Folder and all its contents deleted successfully.");
    } catch (error) {
        console.error("Error deleting folder and contents:", error.message);
    }
}
// deleteFolderFromHost();
module.exports = { hostFile, hostUrl, removeFileFromHost, deleteFolderFromHost }
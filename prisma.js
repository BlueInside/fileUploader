const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function main() {
    // const users = await prisma.user.findFirst({
    //     include: {
    //         files: true,
    //         folders: true,
    //     }
    // });

    // console.log(users);

    // const file = await prisma.file.create({
    //     data: {
    //         fileName: 'Samurai_Jack',
    //         size: 12450,
    //         url: 'downloadString',
    //         folderId: 2,
    //         userId: 1
    //     }
    // });


    // console.log(file);

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

module.exports = prisma
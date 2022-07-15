import sql from "mssql";

const dbSettings = {
    user: "hernan",
    password: "Abc123",
    server: "localhost",
    database: "webstore",
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};

export async function getConnetion() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export { sql };

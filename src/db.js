import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("y-dacha.db")

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS options (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, value TEXT, created_at TIMESTAMP)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )

                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, login VARCHAR(255), password VARCHAR(255), token TEXT, created_at TIMESTAMP)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static prepareValues(props) {
        let str = props.values.join(", ").replace(/((.*)\,?|$)/gi, "?,")
        return str.substr(0, str.length - 1)
    }

    static prepareValuesUpdate(props) {
        return props.names.join(" = ?, ") + " = ?"
    }

    static update(props) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                let sql = `UPDATE ${props.table_name} SET ${DB.prepareValuesUpdate(props)}`
                if(props.hasOwnProperty('where') && props.where) sql += ` WHERE ${props.where}`
                tx.executeSql(
                    sql,
                    [...props.values],
                    (_, result) => {
                        tx.executeSql(
                            `SELECT * FROM options`,
                            [],
                            (_, result) =>resolve(result),
                            (_, error) => reject(error)
                        )
                    },
                    (_, error) => reject(error)
                )
            })
        })
    }

    static insertOptions(name, value) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO options (name, value) VALUES (?, ?)`,
                    [name, value],
                    (_, result) => {
                        //console.log("db", result)
                        return resolve(result.insertId)
                    },
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateOptions(id, name, value) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE options SET name = ?, value = ? WHERE id = ?',
                    [name, value, id],
                    (_, result) => {
                        //console.log("db", result)
                        return resolve(result.insertId)
                    },
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteOptions(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM options WHERE id = ?',
                    [id],
                    resolve(0),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getOption(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT value FROM options WHERE name = '${name}' AND value != ''`,
                    [],
                    (_, result) => {

                        if(result.rows.length == 0) {
                            return resolve(false)
                        } else {
                            return resolve(result.rows._array[0].value)
                        }
                    },
                    (_, error) => {
                        //console.log('errorDB', error)
                        return resolve(false)
                    }
                )
            })
        })
    }

    static async getPushing() {
        const pushing = await DB.getOption("pushing")
        if(pushing == 1.0)
            return true
        return false
    }

    static async createOrUpdate(name, value) {
        //console.log('createOrUpdate', name, value)
        const isExist = await DB.getOption(name)
        if (isExist) {
            let res = await DB.update({
                table_name: "options",
                names: ["value"],
                values: [value],
                where: `name = '${name}'`
            })
            //console.log('isExist', isExist, "== value ==" + value, res)
        } else {
            let res = await DB.insertOptions(name, value)
            //console.log('is_not_Exist', "== name ==" + name, "== value ==" + value, res)
        }

        return Promise.resolve(true)
    }

    static getUser() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT U.* FROM options as O JOIN user as U ON u.id = o.value WHERE name = 'user'",
                    [],
                    (_, result) => {
                        if(result.rows._array.length == 0) {
                            tx.executeSql(
                                "INSERT INTO user (login, password, token) VALUES (null, null, null)",
                                [],
                                (_, result1) => {
                                    tx.executeSql(
                                        "INSERT INTO options (name, value) VALUES (?, ?)",
                                        ['user', result1.insertId],
                                        (_,result2) => {
                                            if(result2.insertId > 0) {
                                                tx.executeSql(
                                                    `SELECT * FROM user WHERE id = ${result2.insertId}`,
                                                    [],
                                                    (_,result3) => resolve(result3.rows._array[0]),
                                                    (_, error) => console.log('error', error1)
                                                )
                                            }
                                        },
                                        (_, error) => reject(error)
                                    )
                                },
                                (_, error1) => reject(error1)
                            )

                        } else resolve(result.rows._array[0])

                    },
                    (_, error) => reject(error)
                )
            })
        })
    }

    static setPushing(is) {
        is = (is === true) ? "1" : "0"
        //console.log('is', is)
        return DB.update({
            table_name: "options",
            names: ["name", "value"],
            values: ["pushing", is],
            where: "name = 'pushing'"
        })
    }
}
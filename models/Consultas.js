import pool from '../config/db.js';

export const getSkaters = async() => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT * FROM skaters");
        console.log('skaters:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al consultar los skaters:', error.stack);
    } finally {
        client.end();
    }
};

export const addSkaters = async (skater) =>{
    const client = await pool.connect();
    try {
        const values = Object.values( skater)
        await client.query('INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, false) RETURNING *',
            values
        );
    } catch (error) {
        console.error('Error al agrgar al skater:', error.stack);
    } finally {
        client.end();
    }
}

export const selectSkater = async (email, password) => {
    const client = await pool.connect();
    try {
        const result = await pool.query(`SELECT * FROM skaters WHERE email = $1 AND password = $2 AND estado=true`,[email,password])
        return result?.rows?.[0];
    } catch (error) {
        console.error('Error al selecionar la clave y contraseña:', error.stack);
    } finally {
        client.release();
    }
    
}

export const updateSkater = async (skater) => {
    const client = await pool.connect();
    try {
        //console.log(skater) me ayuda a ver la actualizacion en la consola
        await client.query('UPDATE skaters SET nombre=$1, password=$2, anos_experiencia=$3, especialidad=$4 WHERE id=$5',
            skater
        );
    } catch (error) {
        console.error('Error al actualizar al skater:', error.stack);
    } finally {
        client.release();
    }
}

export const deleteSkater = async (skaterId) => {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM skaters WHERE id = $1', [skaterId]);
    } catch (error) {
        console.error('Error al eliminar al skater:', error.stack);
    } finally {
        client.release();
    }
}

export const editStatus = async (skater) => {
    const client = await pool.connect();
    try {
        await client.query('UPDATE skaters SET estado=$1 WHERE id=$2',
            skater
        );
    } catch (error) {
        console.error('Error al actualizar al skater:', error.stack);
    } finally {
        client.release();
    }
}
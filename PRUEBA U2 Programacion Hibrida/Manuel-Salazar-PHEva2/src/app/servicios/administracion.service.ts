import { Injectable } from '@angular/core';
import { Cita } from '../modelo/cita';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection;
  
  plataforma: string       = ""
  
  DB_NAME: string          = "lista_citas";
  DB_ENCRIPTADA: boolean   = false;
  DB_MODE: string          = "no-encryption";
  DB_VERSION: number       = 1;
  DB_READ_ONLY: boolean    = false;
  TABLE_NAME: string       = "lista_citas";
  COL_TEXTO: string        = "texto";
  COL_AUTOR: string        = "autor";
  DB_SQL_TABLAS: string    = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_TEXTO} TEXT NOT NULL,
      ${this.COL_AUTOR} TEXT NOT NULL
    );
  `;
  

  constructor() { }

  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore()
    }
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform()
    if (this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)

    const hayCitas = await this.getCitas()

    if(hayCitas.length == 0) {
    await this.addCita({ texto: "Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.", autor: "Thomas Edison"})
    await this.addCita({ texto: "El exito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.", autor: "Ralph Waldo Emerson"})
    await this.addCita({ texto: "Ningun viento es bueno para el barco que no sabe a donde va.", autor: "Séneca"})
    }

  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency()
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()

  }


  
  async addCita(c: Cita): Promise<void> {
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_TEXTO}, ${this.COL_AUTOR}) VALUES (?, ?)`
    await this.db.run(sql, [c.texto, c.autor])
  }

  async getCitas(): Promise<Cita[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const res = await this.db.query(sql)
    return res?.values ?? []
  }

  async getRandomCita(): Promise<Cita | null> {
    const sql = `SELECT * FROM ${this.TABLE_NAME} ORDER BY RANDOM() LIMIT 1`
    const res = await this.db.query(sql)
    return res?.values?.[0] ?? null
  }

  async deleteCita(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`
    await this.db.run(sql, [id])
  }


}

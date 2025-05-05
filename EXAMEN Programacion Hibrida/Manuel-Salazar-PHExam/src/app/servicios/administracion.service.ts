import { Injectable } from '@angular/core';
import { Publicacion } from '../modelo/publicacion';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'

@Injectable({
  providedIn: 'root'
})
export class AdminitracionService {

  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection;

  plataforma: string = ""

  DB_NAME: string = "lista_publicaciones";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "lista_publicaciones";
  COL_TITULO: string = "titulo";
  COL_DESCRIPCION: string = "descripcion";
  COL_FECHA: string = "fecha";
  COL_IMAGEN: string = "imagen";
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_TITULO} TEXT NOT NULL,
      ${this.COL_DESCRIPCION} TEXT NOT NULL,
      ${this.COL_FECHA} TEXT NOT NULL,
      ${this.COL_IMAGEN} TEXT NOT NULL
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
    if (this.plataforma === "web") {
      await this._iniciarPluginWeb()
    }

    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)

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


  async getPublicacion(): Promise<Publicacion[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const res = await this.db.query(sql)
    return res?.values ?? []
  }

  async addPublicacion(p: Publicacion): Promise<void> {
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_TITULO}, ${this.COL_DESCRIPCION}, ${this.COL_FECHA}, ${this.COL_IMAGEN}) VALUES (?, ?, ?, ?)`
    await this.db.run(sql, [p.titulo, p.descripcion, p.fecha.toISOString(), p.imagen])

  }

  async deletePublicacion(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`
    await this.db.run(sql, [id])

  }

}

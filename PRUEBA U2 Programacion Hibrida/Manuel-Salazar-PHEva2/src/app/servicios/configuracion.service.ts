import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private readonly KEY_SHOW_RANDOM_CITA = 'show_random_cita';
  private readonly KEY_ENABLED_DELETE = 'enabled_delete';

  private _showRandomCita = new BehaviorSubject<boolean>(false);
  _showRandomCita$ = this._showRandomCita.asObservable();

  private _enabledDelete = new BehaviorSubject<boolean>(false);
  enabledDelete$ = this._enabledDelete.asObservable();

  constructor() { 
    this.getSetShowRandomCita();
    this.getSetEnabledDeletion();
  }


  async getSetShowRandomCita(): Promise<void> {
    const resultado = await Preferences.get({ key: this.KEY_SHOW_RANDOM_CITA });
    this._showRandomCita.next(resultado.value === 'true');
  }

  async getSetEnabledDeletion(): Promise<void> {
    const resultado = await Preferences.get({ key: this.KEY_ENABLED_DELETE });
    this._enabledDelete.next(resultado.value === 'true');
  }

  async setSetShowRandomCita(value: boolean): Promise<void> {
    await Preferences.set({ key: this.KEY_SHOW_RANDOM_CITA, value: String(value) });
    this._showRandomCita.next(value);
  }

  async setSetEnabledDeletion(value: boolean): Promise<void> {
    await Preferences.set({ key: this.KEY_ENABLED_DELETE, value: String(value) });
    this._enabledDelete.next(value);
  }
}








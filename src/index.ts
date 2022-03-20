import './paths';
import app from './app';

export default class Main {
  public async initialize(): Promise<{ success: boolean; message: string }> {
    try {
      const message = `Server listening on port: ${app.get('port')}`;
      await app.listen(app.get('port'));
      return { success: true, message };
    } catch (error: any) {
      return { success: false, message: error.mesage };
    }
  }
}

new Main().initialize().then(resp => {
  // eslint-disable-next-line no-console
  console.log(resp.message);
});
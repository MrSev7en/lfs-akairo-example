import { Akairo } from 'lfs-akairo';
import { InSimFlags, Language } from 'node-insim/packets';
import { config } from 'dotenv';
import { CarModule } from '#modules/car';
import { WelcomeModule } from '#modules/welcome';
import * as enUS from '#locales/en-US.json';
import * as ptBR from '#locales/pt-BR.json';

async function bootstrap(): Promise<void> {
  const akairo = new Akairo({
    prefix: '!',
    interval: 1000,
    interface: 1000,
    flags: InSimFlags.ISF_MCI | InSimFlags.ISF_MSO_COLS,
    filters: { userNameLowerCase: true },
  });

  akairo.loadModule(CarModule);
  akairo.loadModule(WelcomeModule);

  akairo.loadLocale(Language.LFS_ENGLISH, enUS);
  akairo.loadLocale(Language.LFS_BRAZILIAN, ptBR);

  akairo.connect({
    host: String(process.env.HOST),
    port: Number(process.env.PORT),
    password: String(process.env.PASSWORD),
  });
}

config();
bootstrap();

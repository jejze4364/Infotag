# 📱 GoTag — Monitoramento Inteligente com NFC

GoTag é um aplicativo inteligente que transforma etiquetas NFC passivas em pontos de controle e segurança. Ele permite que objetos físicos (como garrafas, mochilas, caixas ou itens valiosos) sejam monitorados. Se a tag NFC deixar de ser detectada por um tempo e o celular for movido, um alerta é disparado automaticamente no celular ou smartwatch.

---

## 🚀 Funcionalidades Principais

- ✅ Leitura de etiquetas NFC passivas (via aproximação)
- ⏱️ Monitoramento por tempo de inatividade da tag
- 📡 Verificação de movimento com acelerômetro/giroscópio
- 🔔 Alerta por vibração, som ou notificação push
- ⌚ Compatível com Android (e suporte parcial a iOS)
- 🌙 Suporte a modo escuro e uso em background

---

## 📦 Estrutura do Projeto

```
GoTag/
├── src/
│   ├── views/               # Telas principais (Scanner, Alerta, Configurações)
│   ├── hooks/               # useNFCMonitor, useMovementDetection
│   ├── services/            # nfc.ts, motion.ts, notification.ts
│   ├── context/             # AppProvider para gerenciar estado global
│   └── App.tsx
├── assets/                  # Ícones e imagens
├── .env                     # Chaves de API (se usar push)
├── README.md
```

---

## ⚙️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [react-native-nfc-manager](https://github.com/whitedogg13/react-native-nfc-manager)
- [expo-sensors](https://docs.expo.dev/versions/latest/sdk/accelerometer/)
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [React Context API](https://reactjs.org/docs/context.html)
- TailwindCSS via NativeWind (opcional)

---

## 🧪 Como funciona o monitoramento

1. O usuário aproxima o celular da etiqueta NFC GoTag.
2. O app registra a leitura e inicia um temporizador.
3. Se a tag não for detectada após X minutos:
   - Verifica se o celular foi movido com sensores.
   - Se sim, dispara um alerta via som/vibração/push.
4. O alerta pode ser enviado ao smartwatch (via sistema).

---

## 🛠️ Instalação e Uso

```bash
git clone https://github.com/seunome/GoTag.git
cd GoTag
npm install
# ou para compilar diretamente:
# npm run android
# npm run ios
```

### 📲 Permissões necessárias
- Acesso ao NFC (`android.permission.NFC`)
- Sensores de movimento (acelerômetro)
- Notificações
- Execução em segundo plano (Android)

---

## 📌 Roadmap
- [ ] Detecção de tag NFC
- [ ] Timer de inatividade
- [ ] Verificação por acelerômetro
- [ ] Alerta por notificação
- [ ] Suporte a múltiplas tags
- [ ] Painel de histórico
- [ ] Integração com BLE para objetos ativos (versão Pro)

## 🧠 Ideias Futuras
- Painel para mapeamento de tags e localização
- Comunicação com ESP32/NFC via BLE
- Suporte a turismo, rastreamento e anticlonagem

## 📄 Licença
MIT © 2025 – GoTag Project

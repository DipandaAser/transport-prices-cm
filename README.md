# Transport Price (Work in progress)

Transport Price is a website that allow people to contribute how much they usually pay to get from one place to another in Cameroon in order to provide a source of thruth to people when they search how much they need to pay.
People can contribute based on multiple criteria such as: 
- the transport type (Motorbike 🏍, Taxi 🚕, Bus 🚌, Canoe ⛵, Airplaine 🛫)
- the time of the day (Day 🌞, Night 🌚)
- the rank (VIP or not)

## How to contribute

### As a non technical people

- Go to the (contribute page)[https://transport.cm/contribute] and submit the prices you usually pay
- (Click here)[https://github.com/DipandaAser/transport-prices-cm/issues/new/choose] to create an issue or request a feature

### As a technical people

- Dear designers, i'm not a designer so don't be scare 😁 if you see a very bad UI/UX decision on this project. Please kindly suggest changes by (creating an issue)[https://github.com/DipandaAser/transport-prices-cm/issues/new/choose] 

- Developers, 👇

## Dependencies

- Node
- MongoDb

### Run

Before running the app, you may want to create a `.env` file,
copy the content of `.env.example` and paste it in the newly created `.env`.
You can now edit the `DB_URI` which is the MongoDB URI

```bash
# install dependencies
$ pnpm install

# serve with hot reload at localhost:5173
$ pnpm run dev
```

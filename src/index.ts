import { Api, ApiListResponse  } from './components/base/api';
import { ProductList } from './components/buisness/productList';
import './scss/styles.scss';
import { Product } from "./types"
import { CatalogUI } from './components/ui/catalogUI';
import { AllModals } from './components/ui/modalUI';
import { BasketUi } from './components/ui/BasketUI';
import { Basket } from './components/buisness/basket';
import { Order } from './components/buisness/order';
import { OrderUI } from './components/ui/OrderUI';
import { ContactsUI } from './components/ui/contactsUI';
import { LocalStorage } from './components/base/localstorage';
import { Validation } from './components/base/validation';
import { App } from './components/base/app';
const api = new Api('https://larek-api.nomoreparties.co/api/weblarek/')

const productList = new ProductList()
const modal = new AllModals()
const storage = new LocalStorage()
const basket = new Basket(storage)
const order = new Order(basket)
const orderUI = new OrderUI(modal, order)
const basketUi = new BasketUi(modal, basket)
const validation = new Validation(order)
const catalog = new CatalogUI()
const app = new App(modal, basketUi, validation, productList, catalog, api, basket, orderUI, order)
const contactsUI  = new ContactsUI(modal, order,()=> app.createOrder())

app.initApp()





 


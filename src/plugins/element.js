import Vue from 'vue'
import {
	Button,
	Form,
	FormItem,
	Input,
	Message,
	Container,
	Aside,
	Header,
	Main,
	Footer,
	Row,
	Col,
	Menu,
	Submenu,
	MenuItemGroup,
	MenuItem,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Table,
	TableColumn,
	Pagination,
	Tooltip,
	Switch,
	Dialog,
	MessageBox,
	Select,
	Option,
	Tag,
	RadioGroup,
	RadioButton,
	Tabs,
	TabPane,
	Tree,
	Cascader
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tree)
Vue.use(Cascader)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

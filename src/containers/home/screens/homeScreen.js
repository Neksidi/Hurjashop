import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView} from 'react-native';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/homeActions'
import { readProducts, addContact, isLoggedIn } from '../redux/homeActions';
import Loader from '../../../components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import { WEB_URL} from '../../../app/redux/actionTypes';
import Platform from '../../../utility/platform';
import Item from '../../../components/list/horizontal/item';

let { width, height } = Dimensions.get('screen');

//Puhelimen leveys ja korkeus portraitissa
let pWidth = Platform.isPortrait() ? width : height;
let pHeight = Platform.isPortrait() ? height : width;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			categories: null,
			orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
			deviceType: Platform.isTablet() ? 'tablet' : 'phone'
		};

		Dimensions.addEventListener('change', () => {
			this.setState({
				orientation: Platform.isPortrait() ? 'portrait' : 'landscape'
			});
		});
	}

	static navigationOptions = {
		headerStyle: {
      		backgroundColor: '#fcf',
    	},
    	headerTitle: "Koti"
  	};

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
		this.setState({data: [{"id":1617,"name":"Mäkiauto","slug":"makiauto","permalink":"http://hurjashop.qs.fi/product/makiauto/","date_created":"2019-02-11T21:43:55","date_created_gmt":"2019-02-11T19:43:55","date_modified":"2019-02-11T21:49:21","date_modified_gmt":"2019-02-11T19:49:21","type":"simple","status":"publish","featured":false,"catalog_visibility":"visible","description":"<p>Hurjan mäkiautoja on valmistettu vuodesta 2018, jolloin ensimmäinen Hurjan mäkiautoralli järjestettiin. Mäkiautot rantautuivat viime keväänä Kuopion torille, kun 28 hurjaa autokuntaa kisasi historian ensimmäisen Hurja Mäkiautorallin voitosta.</p>\n<p><strong>HURJA MÄKIAUTORALLISSA KISATAAN KAHDESSA ERI SARJASSA</strong></p>\n<p><strong>1. omavalmisteinen sarja.</strong> Tässä sarjassa luovuus ja hulluus pääsevät valloilleen. Kasaa tiimisi, suunnittele oma hurja autosi ja hihat heilumaan. Voit myös tilata oman mäkiauton avaimet käteen periaatteella tapahtuman kumppaneilta.</p>\n<p><strong>2. tehdasvalmisteinen sarja.</strong> Matalankynnyksen sarja mahdollistaa kaikkien hurjien tiimien osallistumisen tapahtumaan. Tiimi voi vuokrata tehdasvalmisteisen mäkiauton tapahtumajärjestäjältä. Panostat tiimilläsi pukeutumiseen ja lavakarismaan voittaaksesi tämän sarjan.</p>\n<p>Mäkiauton mukana saat:</p>\n<ul>\n<li>pahvia</li>\n<li>lisää pahvia</li>\n<li>renkaat</li>\n<li>rungon</li>\n</ul>\n","short_description":"<p>Hurja tee-se-itse mäkiauto hurjaan menoon!</p>\n","sku":"","price":"99.99","regular_price":"125","sale_price":"99.99","date_on_sale_from":null,"date_on_sale_from_gmt":null,"date_on_sale_to":null,"date_on_sale_to_gmt":null,"price_html":"<del><span class=\"woocommerce-Price-amount amount\">125,00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">&euro;</span></span></del> <ins><span class=\"woocommerce-Price-amount amount\">99,99&nbsp;<span class=\"woocommerce-Price-currencySymbol\">&euro;</span></span></ins>","on_sale":true,"purchasable":true,"total_sales":0,"virtual":false,"downloadable":false,"downloads":[],"download_limit":-1,"download_expiry":-1,"external_url":"","button_text":"","tax_status":"taxable","tax_class":"","manage_stock":false,"stock_quantity":null,"in_stock":true,"backorders":"no","backorders_allowed":false,"backordered":false,"sold_individually":false,"weight":"","dimensions":{"length":"","width":"","height":""},"shipping_required":true,"shipping_taxable":true,"shipping_class":"","shipping_class_id":0,"reviews_allowed":true,"average_rating":"0.00","rating_count":0,"related_ids":[],"upsell_ids":[],"cross_sell_ids":[],"parent_id":0,"purchase_note":"","categories":[{"id":22,"name":"Mäkiautoralli","slug":"makiautoralli"}],"tags":[],"images":[{"id":1619,"date_created":"2019-02-11T23:45:37","date_created_gmt":"2019-02-11T19:45:37","date_modified":"2019-02-11T23:45:37","date_modified_gmt":"2019-02-11T19:45:37","src":"http://hurjashop.qs.fi/wp-content/uploads/2019/02/makiauto.png","name":"makiauto","alt":"","position":0}],"attributes":[],"default_attributes":[],"variations":[],"grouped_products":[],"menu_order":0,"meta_data":[{"id":52109,"key":"_vc_post_settings","value":{"vc_grid_id":[]}},{"id":52115,"key":"_la_360_enable","value":""},{"id":52145,"key":"slide_template","value":"default"},{"id":52146,"key":"_yoast_wpseo_primary_product_cat","value":"22"},{"id":52147,"key":"mantis_options","value":{"product_video_url":"","layout":"inherit","small_layout":"inherit","main_full_width":"inherit","main_space":{"top":"","bottom":""},"sidebar":"","main_menu":"","hide_header":"no","header_layout":"inherit","header_full_width":"inherit","header_transparency":"inherit","header_sticky":"inherit","page_title_bar_layout":"inherit","hide_breadcrumb":"no","enable_page_title_subtext":"no","page_title_custom_subtext":"","hide_page_title":"no","page_title_custom":"","page_title_font_size":{"xlg":"","lg":"","md":"","sm":"","xs":"","mb":""},"page_title_bar_style":"no","page_title_bar_background":{"image":"","repeat":"repeat","position":"left top","attachment":"","size":"","color":""},"page_title_bar_heading_color":"","page_title_bar_text_color":"","page_title_bar_link_color":"","page_title_bar_link_hover_color":"","page_title_bar_spacing":{"top":"","bottom":""},"page_title_bar_spacing_tablet":{"top":"","bottom":""},"page_title_bar_spacing_mobile":{"top":"","bottom":""},"hide_footer":"no","footer_layout":"inherit","footer_full_width":"inherit"}},{"id":52148,"key":"_yoast_wpseo_content_score","value":"90"},{"id":52153,"key":"_swatch_type","value":"default"}],"_links":{"self":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products/1617"}],"collection":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products"}]}},{"id":1489,"name":"Lippis (valkoinen-musta)","slug":"hurjalippis-valkoinen","permalink":"http://hurjashop.qs.fi/product/hurjalippis-valkoinen/","date_created":"2018-08-22T07:31:19","date_created_gmt":"2018-08-22T05:31:19","date_modified":"2018-09-18T08:49:54","date_modified_gmt":"2018-09-18T06:49:54","type":"simple","status":"publish","featured":false,"catalog_visibility":"visible","description":"","short_description":"","sku":"","price":"25","regular_price":"25","sale_price":"","date_on_sale_from":null,"date_on_sale_from_gmt":null,"date_on_sale_to":null,"date_on_sale_to_gmt":null,"price_html":"<span class=\"woocommerce-Price-amount amount\">25,00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">&euro;</span></span>","on_sale":false,"purchasable":true,"total_sales":0,"virtual":false,"downloadable":false,"downloads":[],"download_limit":-1,"download_expiry":-1,"external_url":"","button_text":"","tax_status":"taxable","tax_class":"","manage_stock":false,"stock_quantity":null,"in_stock":true,"backorders":"no","backorders_allowed":false,"backordered":false,"sold_individually":false,"weight":"0.100","dimensions":{"length":"","width":"","height":"8"},"shipping_required":true,"shipping_taxable":true,"shipping_class":"","shipping_class_id":0,"reviews_allowed":true,"average_rating":"0.00","rating_count":0,"related_ids":[1485,1481],"upsell_ids":[],"cross_sell_ids":[],"parent_id":0,"purchase_note":"","categories":[{"id":15,"name":"Lippikset","slug":"lippikset"}],"tags":[],"images":[{"id":1599,"date_created":"2018-09-18T10:46:16","date_created_gmt":"2018-09-18T06:46:16","date_modified":"2018-09-18T10:46:16","date_modified_gmt":"2018-09-18T06:46:16","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_valko_etu2.jpg","name":"hurjalippis_valko_etu2","alt":"","position":0},{"id":1601,"date_created":"2018-09-18T10:49:41","date_created_gmt":"2018-09-18T06:49:41","date_modified":"2018-09-18T10:49:41","date_modified_gmt":"2018-09-18T06:49:41","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_valko_viisto2.jpg","name":"hurjalippis_valko_viisto2","alt":"","position":1},{"id":1600,"date_created":"2018-09-18T10:49:39","date_created_gmt":"2018-09-18T06:49:39","date_modified":"2018-09-18T10:49:39","date_modified_gmt":"2018-09-18T06:49:39","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_valko_takaa2.jpg","name":"hurjalippis_valko_takaa2","alt":"","position":2},{"id":1547,"date_created":"2018-08-29T11:40:21","date_created_gmt":"2018-08-29T07:40:21","date_modified":"2018-08-29T11:42:33","date_modified_gmt":"2018-08-29T07:42:33","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/lippisvalkoinen-e1535528548484.jpg","name":"lippisvalkoinen","alt":"","position":3},{"id":1254,"date_created":"2018-07-26T16:39:52","date_created_gmt":"2018-07-26T12:39:52","date_modified":"2018-07-26T16:39:52","date_modified_gmt":"2018-07-26T12:39:52","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/06/hurja_lippis_v.jpg","name":"hurja_lippis_v","alt":"","position":4}],"attributes":[],"default_attributes":[],"variations":[],"grouped_products":[],"menu_order":0,"meta_data":[{"id":51446,"key":"_vc_post_settings","value":{"vc_grid_id":[]}},{"id":51459,"key":"_la_360_enable","value":""},{"id":51489,"key":"slide_template","value":"default"},{"id":51490,"key":"mantis_options","value":{"product_video_url":"","layout":"inherit","small_layout":"inherit","main_full_width":"inherit","main_space":{"top":"","bottom":""},"sidebar":"","main_menu":"","hide_header":"no","header_layout":"inherit","header_full_width":"inherit","header_transparency":"inherit","header_sticky":"inherit","page_title_bar_layout":"inherit","hide_breadcrumb":"no","enable_page_title_subtext":"no","page_title_custom_subtext":"","hide_page_title":"no","page_title_custom":"","page_title_font_size":{"xlg":"","lg":"","md":"","sm":"","xs":"","mb":""},"page_title_bar_style":"no","page_title_bar_background":{"image":"","repeat":"repeat","position":"left top","attachment":"","size":"","color":""},"page_title_bar_heading_color":"","page_title_bar_text_color":"","page_title_bar_link_color":"","page_title_bar_link_hover_color":"","page_title_bar_spacing":{"top":"","bottom":""},"page_title_bar_spacing_tablet":{"top":"","bottom":""},"page_title_bar_spacing_mobile":{"top":"","bottom":""},"hide_footer":"no","footer_layout":"inherit","footer_full_width":"inherit"}},{"id":52070,"key":"_yoast_wpseo_primary_product_cat","value":""},{"id":52071,"key":"_yoast_wpseo_content_score","value":"60"},{"id":52076,"key":"_swatch_type","value":"default"}],"_links":{"self":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products/1489"}],"collection":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products"}]}},{"id":1485,"name":"Lippis (camo-kulta)","slug":"hurjalippis-camo","permalink":"http://hurjashop.qs.fi/product/hurjalippis-camo/","date_created":"2018-08-22T07:30:30","date_created_gmt":"2018-08-22T05:30:30","date_modified":"2018-09-18T11:23:32","date_modified_gmt":"2018-09-18T09:23:32","type":"simple","status":"publish","featured":false,"catalog_visibility":"visible","description":"","short_description":"","sku":"","price":"25","regular_price":"25","sale_price":"","date_on_sale_from":null,"date_on_sale_from_gmt":null,"date_on_sale_to":null,"date_on_sale_to_gmt":null,"price_html":"<span class=\"woocommerce-Price-amount amount\">25,00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">&euro;</span></span>","on_sale":false,"purchasable":true,"total_sales":3,"virtual":false,"downloadable":false,"downloads":[],"download_limit":-1,"download_expiry":-1,"external_url":"","button_text":"","tax_status":"taxable","tax_class":"","manage_stock":false,"stock_quantity":null,"in_stock":true,"backorders":"no","backorders_allowed":false,"backordered":false,"sold_individually":false,"weight":"","dimensions":{"length":"","width":"","height":""},"shipping_required":true,"shipping_taxable":true,"shipping_class":"","shipping_class_id":0,"reviews_allowed":true,"average_rating":"0.00","rating_count":0,"related_ids":[1481,1489],"upsell_ids":[],"cross_sell_ids":[],"parent_id":0,"purchase_note":"","categories":[{"id":15,"name":"Lippikset","slug":"lippikset"}],"tags":[],"images":[{"id":1605,"date_created":"2018-09-18T13:20:30","date_created_gmt":"2018-09-18T09:20:30","date_modified":"2018-09-18T13:20:30","date_modified_gmt":"2018-09-18T09:20:30","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_camo_etu2.jpg","name":"hurjalippis_camo_etu2","alt":"","position":0},{"id":1607,"date_created":"2018-09-18T13:20:46","date_created_gmt":"2018-09-18T09:20:46","date_modified":"2018-09-18T13:20:46","date_modified_gmt":"2018-09-18T09:20:46","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_camo_viisto2.jpg","name":"hurjalippis_camo_viisto2","alt":"","position":1},{"id":1610,"date_created":"2018-09-18T13:23:24","date_created_gmt":"2018-09-18T09:23:24","date_modified":"2018-09-18T13:23:24","date_modified_gmt":"2018-09-18T09:23:24","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_camo_taka2.jpg","name":"hurjalippis_camo_taka2","alt":"","position":2},{"id":1540,"date_created":"2018-08-29T11:25:36","date_created_gmt":"2018-08-29T07:25:36","date_modified":"2018-08-29T13:07:35","date_modified_gmt":"2018-08-29T09:07:35","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/DSC_2843-e1535533649502.jpg","name":"DSC_2843","alt":"","position":3}],"attributes":[],"default_attributes":[],"variations":[],"grouped_products":[],"menu_order":0,"meta_data":[{"id":51401,"key":"_vc_post_settings","value":{"vc_grid_id":[]}},{"id":51414,"key":"_la_360_enable","value":""},{"id":51444,"key":"slide_template","value":"default"},{"id":51445,"key":"mantis_options","value":{"product_video_url":"","layout":"inherit","small_layout":"inherit","main_full_width":"inherit","main_space":{"top":"","bottom":""},"sidebar":"","main_menu":"","hide_header":"no","header_layout":"inherit","header_full_width":"inherit","header_transparency":"inherit","header_sticky":"inherit","page_title_bar_layout":"inherit","hide_breadcrumb":"no","enable_page_title_subtext":"no","page_title_custom_subtext":"","hide_page_title":"no","page_title_custom":"","page_title_font_size":{"xlg":"","lg":"","md":"","sm":"","xs":"","mb":""},"page_title_bar_style":"no","page_title_bar_background":{"image":"","repeat":"repeat","position":"left top","attachment":"","size":"","color":""},"page_title_bar_heading_color":"","page_title_bar_text_color":"","page_title_bar_link_color":"","page_title_bar_link_hover_color":"","page_title_bar_spacing":{"top":"","bottom":""},"page_title_bar_spacing_tablet":{"top":"","bottom":""},"page_title_bar_spacing_mobile":{"top":"","bottom":""},"hide_footer":"no","footer_layout":"inherit","footer_full_width":"inherit"}},{"id":52097,"key":"_yoast_wpseo_primary_product_cat","value":""},{"id":52098,"key":"_yoast_wpseo_content_score","value":"60"},{"id":52101,"key":"_swatch_type","value":"default"}],"_links":{"self":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products/1485"}],"collection":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products"}]}},{"id":1481,"name":"Lippis (musta-punainen)","slug":"hurjalippis-musta","permalink":"http://hurjashop.qs.fi/product/hurjalippis-musta/","date_created":"2018-08-22T07:29:20","date_created_gmt":"2018-08-22T05:29:20","date_modified":"2018-09-18T11:17:39","date_modified_gmt":"2018-09-18T09:17:39","type":"simple","status":"publish","featured":false,"catalog_visibility":"visible","description":"","short_description":"","sku":"","price":"25","regular_price":"25","sale_price":"","date_on_sale_from":null,"date_on_sale_from_gmt":null,"date_on_sale_to":null,"date_on_sale_to_gmt":null,"price_html":"<span class=\"woocommerce-Price-amount amount\">25,00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">&euro;</span></span>","on_sale":false,"purchasable":true,"total_sales":0,"virtual":false,"downloadable":false,"downloads":[],"download_limit":-1,"download_expiry":-1,"external_url":"","button_text":"","tax_status":"taxable","tax_class":"","manage_stock":false,"stock_quantity":null,"in_stock":true,"backorders":"no","backorders_allowed":false,"backordered":false,"sold_individually":false,"weight":"","dimensions":{"length":"","width":"","height":""},"shipping_required":true,"shipping_taxable":true,"shipping_class":"","shipping_class_id":0,"reviews_allowed":true,"average_rating":"0.00","rating_count":0,"related_ids":[1489,1485],"upsell_ids":[],"cross_sell_ids":[],"parent_id":0,"purchase_note":"","categories":[{"id":15,"name":"Lippikset","slug":"lippikset"}],"tags":[],"images":[{"id":1602,"date_created":"2018-09-18T13:17:09","date_created_gmt":"2018-09-18T09:17:09","date_modified":"2018-09-18T13:17:09","date_modified_gmt":"2018-09-18T09:17:09","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_musta_etu2.jpg","name":"hurjalippis_musta_etu2","alt":"","position":0},{"id":1604,"date_created":"2018-09-18T13:17:26","date_created_gmt":"2018-09-18T09:17:26","date_modified":"2018-09-18T13:17:26","date_modified_gmt":"2018-09-18T09:17:26","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_musta_viisto2.jpg","name":"hurjalippis_musta_viisto2","alt":"","position":1},{"id":1603,"date_created":"2018-09-18T13:17:24","date_created_gmt":"2018-09-18T09:17:24","date_modified":"2018-09-18T13:17:24","date_modified_gmt":"2018-09-18T09:17:24","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/hurjalippis_musta_takaa2.jpg","name":"hurjalippis_musta_takaa2","alt":"","position":2},{"id":1253,"date_created":"2018-07-26T16:39:50","date_created_gmt":"2018-07-26T12:39:50","date_modified":"2018-07-26T16:39:50","date_modified_gmt":"2018-07-26T12:39:50","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/06/hurja_lippis_mp.jpg","name":"hurja_lippis_mp","alt":"","position":3},{"id":1541,"date_created":"2018-08-29T11:26:43","date_created_gmt":"2018-08-29T07:26:43","date_modified":"2018-08-29T13:15:49","date_modified_gmt":"2018-08-29T09:15:49","src":"http://hurjashop.qs.fi/wp-content/uploads/2018/08/DSC_2812-2-e1535534144343.jpg","name":"DSC_2812-2","alt":"","position":4}],"attributes":[],"default_attributes":[],"variations":[],"grouped_products":[],"menu_order":0,"meta_data":[{"id":51356,"key":"_vc_post_settings","value":{"vc_grid_id":[]}},{"id":51369,"key":"_la_360_enable","value":""},{"id":51399,"key":"slide_template","value":"default"},{"id":51400,"key":"mantis_options","value":{"product_video_url":"","layout":"inherit","small_layout":"inherit","main_full_width":"inherit","main_space":{"top":"","bottom":""},"sidebar":"","main_menu":"","hide_header":"no","header_layout":"inherit","header_full_width":"inherit","header_transparency":"inherit","header_sticky":"inherit","page_title_bar_layout":"inherit","hide_breadcrumb":"no","enable_page_title_subtext":"no","page_title_custom_subtext":"","hide_page_title":"no","page_title_custom":"","page_title_font_size":{"xlg":"","lg":"","md":"","sm":"","xs":"","mb":""},"page_title_bar_style":"no","page_title_bar_background":{"image":"","repeat":"repeat","position":"left top","attachment":"","size":"","color":""},"page_title_bar_heading_color":"","page_title_bar_text_color":"","page_title_bar_link_color":"","page_title_bar_link_hover_color":"","page_title_bar_spacing":{"top":"","bottom":""},"page_title_bar_spacing_tablet":{"top":"","bottom":""},"page_title_bar_spacing_mobile":{"top":"","bottom":""},"hide_footer":"no","footer_layout":"inherit","footer_full_width":"inherit"}},{"id":52083,"key":"_swatch_type","value":"default"},{"id":52084,"key":"_yoast_wpseo_primary_product_cat","value":""},{"id":52085,"key":"_yoast_wpseo_content_score","value":"60"}],"_links":{"self":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products/1481"}],"collection":[{"href":"http://hurjashop.qs.fi/wp-json/wc/v2/products"}]}}]});

		this.setState({isLoading: false});


	}

	render() {
		let oWidth = this.state.orientation == 'portrait' ? pWidth : pHeight;

		let output =
		!this.state.isLoading && this.state.data != null ? (
			<Carousel
				data={this.state.data}
				firstItem={(this.state.data.length - 1) / 2}
				keyExtractor={(item, index) => index.toString()}
				sliderWidth={oWidth}
				itemWidth={oWidth / 2 - 15}
				inactiveSlideOpacity={1}
				renderItem={({ item }) => (
					<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
				)}
			/>
		) : (
			<Loader />
		);

		return (
			<View>
				<Text>Welcome Home!</Text>
				{
					this.props.products.possible.map((product, index) => {
						const button = <Button
								key={ product }
								title={  product  }
								onPress={() =>
									this.props.addProduct("Uusi " + product)
								}
						/>
						return button;
					})
				}
				{
					this.props.products.current.map((product, index) => {
						return <Text key={ product }>
							{product} { index }
						</Text>
					})
				}
				<Button 
					title="Avaa Drawer"
					onPress={() =>
						this.props.navigation.toggleDrawer()
					}
				/>
				<Button 
					title="Kaikki tuotteet"
					onPress={() =>
						this.props.navigation.navigate('AllProducts')
					}
				/>
				<Button 
					title="Tutoriaaliin"
					onPress={() =>
						this.props.navigation.navigate('Tutorial')
					}
				/>
				<Button 
					title="Kategoriaan"
					onPress={() =>
						this.props.navigation.navigate('Category')
					}
				/>
				
				{output}

			</View>
		);
	}
}


const mapStateToProps = (state) => {
	const { products } = state

	return { products }
};

const mapDispatchToProps = dispatch => ({
		readProducts: products => {
			dispatch(readProducts(products));
		},
		//bindActionCreators({ addProduct }, dispatch)
});

	

export default connect(mapStateToProps, mapDispatchToProps)(Home);

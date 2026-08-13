import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FeaturedProducts from '../../components/FeaturedProducts';
import ServicesSection from '../../components/ServicesSection';
import PharmacyLocationMap from '../../components/PharmacyLocationMap';
import SocialMediaQuickContact from '../../components/SocialMediaQuickContact';
import BottomProductsSection from '../../components/BottomProductsSection';
import SpecialMessageCardCarousel from '../../components/SpecialMessageCardCarousel';

// Example categories and subcategories
	const categories = [
	{
		name: 'categories.skinCare',
		subcategories: [
			'categories.moisturizers',
			'categories.cleansers',
			'categories.sunCare',
			'categories.brightening',
			'categories.serum',
			{ name: 'categories.koreanBeauty', badge: 'badges.new' },
			'categories.masks',
			'categories.naturalBeauty',
			'categories.skinTechTools',
		],
	},
	{ name: 'categories.fragrances' },
	{ name: 'categories.makeup' },
	{ name: 'categories.babyCareDiapers' },
	{ name: 'categories.vitamins' },
	{ name: 'categories.personalCare' },
	{ name: 'categories.sportNutrition' },
	{ name: 'categories.healthyDevices' },
	{ name: 'categories.homeHealthCare' },
	// Add more as needed
];

const UserDashboardHomePage = () => {
	const { t } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-background text-foreground flex flex-col">
			{/* Top Navbar */}
			<nav className="flex gap-8 items-center px-8 py-3 bg-card shadow z-30">
				<span className="font-semibold">{t('topNavbar.eServices')}</span>
				<span className="font-semibold text-destructive">{t('topNavbar.flashSales')}</span>
				<span className="font-semibold text-blue-700">{t('topNavbar.healthCenter')}</span>
				<span className="ms-auto font-bold text-lg">{t('topNavbar.brandName')}</span>
			</nav>

			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="w-64 bg-card shadow-lg h-full hidden md:block">
					<h2 className="font-bold p-4 border-b border-border">
						{t('allCategories')}
					</h2>
					<ul>
						{categories.map((cat) => (
							<li key={cat.name}>
										<button
											className={`w-full text-left px-4 py-2 hover:bg-primary/10 ${
												selectedCategory === cat.name
													? 'bg-primary/10 font-bold'
													: ''
											}`}
											onClick={() => setSelectedCategory(cat.name)}
										>
											{cat.name}
										</button>
								{selectedCategory === cat.name && cat.subcategories && (
									<ul className="ms-6">
										{cat.subcategories.map((sub) =>
											typeof sub === 'string' ? (
												<li key={sub} className="py-1">
													{sub}
												</li>
											) : (
												<li key={sub.name} className="py-1 flex items-center">
													{t(sub.name)}
													<span className="ms-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
														{t(sub.badge)}
													</span>
												</li>
											)
										)}
									</ul>
								)}
							</li>
						))}
					</ul>
				</aside>

				{/* Main Content */}
				<main className="flex-1 px-4 py-8 max-w-7xl mx-auto">
					{/* Welcome Message Section */}
					<section className="relative z-20 flex flex-col md:flex-row items-center gap-8 mb-10">
						<img
							src="/images/logo.svg"
							alt={t('logoAlt') || "Awon Pharmacy Logo"}
							className="h-32 w-auto"
						/>
						<div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg p-8 text-white flex-1">
							<h1 className="text-4xl font-extrabold mb-4">
								{t('welcomeMessage') || 'Welcome to Awon Pharmacy - Your Trusted Digital Pharmacy'}
							</h1>
							<p className="text-lg max-w-lg">
								{t('welcomeDescription') || 'Providing quality healthcare products and services to meet your needs.'}
							</p>
							<button className="mt-4 bg-card text-green-700 font-bold px-6 py-3 rounded shadow hover:bg-muted transition">
								{t('shopNow') || 'Shop Now'}
							</button>
						</div>
					</section>

					{/* Featured Products */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-6">
							{t('featuredProducts') || 'Featured Products'}
						</h2>
						<FeaturedProducts category={selectedCategory} />
					</section>

					{/* Services Section */}
					<section className="mb-12">
						<ServicesSection />
					</section>

					{/* Pharmacy Location Map Section */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-6 text-center">
							{t('ourLocation') || 'Our Location'}
						</h2>
						<PharmacyLocationMap />
					</section>

					{/* Social Media Quick Contact Section */}
					<section className="mb-12">
						<SocialMediaQuickContact />
					</section>

					{/* Bottom Products Section */}
					<section>
						<SpecialMessageCardCarousel theme="light" />
					</section>

					<section>
						<BottomProductsSection />
					</section>
				</main>
			</div>
		</div>
	);
};

export default UserDashboardHomePage;

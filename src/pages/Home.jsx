// This is our main Home page! It shows a cool rotating banner with farmer slogans,
// info about government schemes, and a quick way to check product prices.
// I made it bilingual (Hindi/English) to help more farmers use it easily.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// All the text we need in both languages
const translations = {
  en: {
    aboutTitle: 'About Us',
    aboutText: 'This app helps farmers manage their products, know market prices, and get information about government schemes.',
    viewProducts: 'View Product List',
    policiesTitle: 'Government Schemes',
    marketPricesTitle: 'Current Market Prices',
    pmKisan: 'PM Kisan Samman Nidhi Yojana',
    pmKisanDesc: 'Direct income support of ₹6,000 per year to all farmer families',
    cropInsurance: 'Pradhan Mantri Fasal Bima Yojana',
    cropInsuranceDesc: 'Comprehensive crop insurance scheme for farmers',
    eNam: 'e-NAM (National Agriculture Market)',
    eNamDesc: 'Online trading platform for agricultural commodities',
    priceDiff: 'Price Difference',
    sellingPrice: 'Selling Price',
    marketPrice: 'Market Price',
    readMore: 'Read More',
    kcc: 'Kisan Credit Card Scheme',
    kccDesc: 'Low-interest loans for agricultural needs.',
    marketContacts: 'Market Contacts',
    supportOrgs: 'Support Organizations',
    mandiName: 'Mandi Name',
    location: 'Location',
    contact: 'Contact',
    helpOffered: 'Help Offered',
    website: 'Website',
    viewMarketPrice: 'View Market Price',
    currentMarketPrices: 'Current Market Prices'
  },
  hi: {
    aboutTitle: 'हमारे बारे में',
    aboutText: 'यह ऐप किसानों को उनके उत्पादों का प्रबंधन करने, बाजार मूल्य जानने और सरकारी योजनाओं की जानकारी देने में मदद करता है।',
    viewProducts: 'उत्पाद सूची देखें',
    policiesTitle: 'सरकारी योजनाएं',
    marketPricesTitle: 'वर्तमान बाजार मूल्य',
    pmKisan: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    pmKisanDesc: 'सभी किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता',
    cropInsurance: 'प्रधानमंत्री फसल बीमा योजना',
    cropInsuranceDesc: 'किसानों के लिए व्यापक फसल बीमा योजना',
    eNam: 'ई-नाम (राष्ट्रीय कृषि बाजार)',
    eNamDesc: 'कृषि वस्तुओं के लिए ऑनलाइन ट्रेडिंग प्लेटफॉर्म',
    priceDiff: 'मूल्य अंतर',
    sellingPrice: 'बिक्री मूल्य',
    marketPrice: 'बाजार मूल्य',
    readMore: 'और पढ़ें',
    kcc: 'किसान क्रेडिट कार्ड योजना',
    kccDesc: 'कम ब्याज पर ऋण और आवश्यकताओं की पूर्ति।',
    marketContacts: 'बाज़ार संपर्क',
    supportOrgs: 'सहायता संस्थाएं',
    mandiName: 'मंडी का नाम',
    location: 'स्थान',
    contact: 'संपर्क नंबर',
    helpOffered: 'सहायता प्रकार',
    website: 'वेबसाइट',
    viewMarketPrice: 'मंडी मूल्य देखें',
    currentMarketPrices: 'वर्तमान बाजार मूल्य'
  }
};

// Cool farmer slogans that rotate in the banner
const slogans = [
  'जय जवान, जय किसान',
  'किसान हैं तो जीवन है',
  'कृषि ही जीवन का आधार है',
  'किसानों की उन्नति, देश की प्रगति'
];

// Sample market prices for different crops
const marketData = [
  { name: 'गेहूं', sellingPrice: 2100, marketPrice: 2250 },
  { name: 'चावल', sellingPrice: 3200, marketPrice: 3100 },
  { name: 'सरसों', sellingPrice: 5800, marketPrice: 6000 },
  { name: 'मक्का', sellingPrice: 1800, marketPrice: 1850 }
];

const policyLinks = {
  pmKisan: 'https://pmkisan.gov.in',
  cropInsurance: 'https://pmfby.gov.in',
  eNam: 'https://enam.gov.in/web/',
  kcc: 'https://www.pmkisan.gov.in/Documents/KCC.pdf'
};

// This function helps us show prices in Indian Rupees format
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Add sample data for market contacts
const marketContacts = [
  {
    name: 'कृषि उपज मंडी',
    location: 'दिल्ली',
    contact: '+91 9876543210'
  },
  {
    name: 'किसान मंडी',
    location: 'हरियाणा',
    contact: '+91 9876543211'
  },
  {
    name: 'ग्रामीण मंडी',
    location: 'उत्तर प्रदेश',
    contact: '+91 9876543212'
  },
  {
    name: 'देहरादून मंडी',
    location: 'देहरादून, उत्तराखंड',
    contact: '+91 135 2656789'
  }
];

// Add sample data for support organizations
const supportOrgs = [
  {
    name: 'कृषि मित्र संस्था',
    help: 'बीमा, मंडी गाइडेंस',
    contact: 'https://krishimitra.org'
  },
  {
    name: 'किसान सहायता केंद्र',
    help: 'तकनीकी सहायता, बीज वितरण',
    contact: '+91 9876543213'
  }
];

// Market price links for different crops
const marketPriceLinks = {
  'गेहूं': 'https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=1',
  'धान': 'https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=2',
  'गन्ना': 'https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=3',
  'सरसों': 'https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=4',
  'आलू': 'https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=5'
};

// Crop emojis
const cropEmojis = {
  'गेहूं': '🌾',
  'धान': '🌾',
  'गन्ना': '🎋',
  'सरसों': '🌱',
  'आलू': '🥔'
};

const Home = () => {
  // Get the current language (Hindi or English)
  const { language } = useLanguage();
  // Keep track of which slogan to show
  const [currentSlogan, setCurrentSlogan] = useState(0);
  // Get the right translations for current language
  const t = translations[language];

  // This makes our slogans rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 4000);
    // Clean up when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cool rotating banner with farmer slogans */}
      <div className="bg-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center animate-fade-in">
            {slogans[currentSlogan]}
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About section explaining what our app does */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.aboutTitle}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.aboutText}
          </p>
        </section>

        {/* Big button to go to product list */}
        <section className="mb-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t.viewProducts}
          </Link>
        </section>

        {/* Cards showing different government schemes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.policiesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Each card shows info about a government scheme */}
            {/* PM Kisan Card */}
            <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.pmKisan}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.pmKisanDesc}</p>
              <a
                href={policyLinks.pmKisan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Crop Insurance Card */}
            <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.cropInsurance}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.cropInsuranceDesc}</p>
              <a
                href={policyLinks.cropInsurance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* e-NAM Card */}
            <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.eNam}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.eNamDesc}</p>
              <a
                href={policyLinks.eNam}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* KCC Card */}
            <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.kcc}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.kccDesc}</p>
              <a
                href={policyLinks.kcc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Table showing current market prices */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.marketPricesTitle}</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'hi' ? 'उत्पाद' : 'Product'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.sellingPrice}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.marketPrice}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.priceDiff}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marketData.map((item, index) => {
                    const priceDiff = item.marketPrice - item.sellingPrice;
                    const isPositive = priceDiff >= 0;
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPrice(item.sellingPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPrice(item.marketPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '+' : ''}{formatPrice(priceDiff)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Market Prices Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💰</span>
              <h2 className="text-2xl font-bold text-gray-900">{t.currentMarketPrices}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(marketPriceLinks).map(([crop, link]) => (
                <div key={crop} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{cropEmojis[crop] || '🌾'}</span>
                    <h3 className="text-lg font-medium text-gray-900">{crop}</h3>
                  </div>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    title={t.viewMarketPrice}
                  >
                    {t.viewMarketPrice}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Contacts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.marketContacts}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketContacts.map((contact, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{contact.name}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{t.location}:</span> {contact.location}
                </p>
                <a
                  href={`tel:${contact.contact}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {contact.contact}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Support Organizations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.supportOrgs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOrgs.map((org, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{org.name}</h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">{t.helpOffered}:</span> {org.help}
                </p>
                {org.contact.startsWith('http') ? (
                  <a
                    href={org.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800 font-medium inline-flex items-center"
                  >
                    {t.website}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <a
                    href={`tel:${org.contact}`}
                    className="text-green-700 hover:text-green-800 font-medium inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {org.contact}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 
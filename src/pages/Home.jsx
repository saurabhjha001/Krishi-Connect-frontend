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
  const { language } = useLanguage();
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const t = translations[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rotating banner with farmer slogans */}
      <div className="bg-green-600 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center animate-fade-in">
            {slogans[currentSlogan]}
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* About section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{t.aboutTitle}</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {t.aboutText}
          </p>
        </section>

        {/* Product list button */}
        <section className="mb-12 sm:mb-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-lg sm:text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t.viewProducts}
          </Link>
        </section>

        {/* Government schemes section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t.policiesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* PM Kisan Card */}
            <div className="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t.pmKisan}</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">{t.pmKisanDesc}</p>
              <a
                href={policyLinks.pmKisan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm sm:text-base"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Crop Insurance Card */}
            <div className="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t.cropInsurance}</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">{t.cropInsuranceDesc}</p>
              <a
                href={policyLinks.cropInsurance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm sm:text-base"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* e-NAM Card */}
            <div className="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t.eNam}</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">{t.eNamDesc}</p>
              <a
                href={policyLinks.eNam}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm sm:text-base"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* KCC Card */}
            <div className="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t.kcc}</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">{t.kccDesc}</p>
              <a
                href={policyLinks.kcc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm sm:text-base"
              >
                {t.readMore}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Market Prices section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t.marketPricesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {marketData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-2xl">{cropEmojis[item.name]}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">{t.sellingPrice}:</span>
                    <span className="font-medium">{formatPrice(item.sellingPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">{t.marketPrice}:</span>
                    <span className="font-medium">{formatPrice(item.marketPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">{t.priceDiff}:</span>
                    <span className={`font-medium ${item.marketPrice > item.sellingPrice ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPrice(item.marketPrice - item.sellingPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Contacts section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t.marketContacts}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {marketContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{contact.name}</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-600">
                    <span className="font-medium">{t.location}:</span> {contact.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">{t.contact}:</span> {contact.contact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Organizations section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t.supportOrgs}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {supportOrgs.map((org, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{org.name}</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-600">
                    <span className="font-medium">{t.helpOffered}:</span> {org.help}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">{t.website}:</span>{' '}
                    <a
                      href={org.contact.startsWith('http') ? org.contact : `tel:${org.contact}`}
                      className="text-blue-600 hover:text-blue-800"
                      target={org.contact.startsWith('http') ? '_blank' : undefined}
                      rel={org.contact.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {org.contact}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { localizeCategory } from '../../lib/categoryLabels';
import CategoryGrid from '../../components/home/CategoryGrid';
import CampaignBannerCard from '../../components/ui/CampaignBannerCard';

const CategoriesPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* 1. Top High-Res Campaign Banner Showcase */}
        <div className="mb-10">
          <CampaignBannerCard
            src="/images/ads/3.png"
            alt="دليل أقسام صيدلية عون القحطاني"
            to="/products"
            badgeText={isAr ? 'كتالوج الأقسام المعتمدة' : 'Certified Categories Catalog'}
          />
        </div>

        {/* 2. Main Category Grid Component */}
        <CategoryGrid />

        {/* 3. Secondary Campaign Banner Showcase */}
        <div className="mt-12">
          <CampaignBannerCard
            src="/images/ads/10.png"
            alt="الأدوية والمستحضرات الطبية المعتمدة"
            to="/products?category=prescription"
            badgeText={isAr ? 'الأدوية والمستحضرات المعتمدة' : 'MOH Certified Products'}
          />
        </div>

      </div>
    </div>
  );
};

export default CategoriesPage;

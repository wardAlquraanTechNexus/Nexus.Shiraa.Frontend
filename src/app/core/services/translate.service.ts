import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'ar';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'language';
  private readonly DEFAULT_LANGUAGE: Language = 'en';

  private translations: Record<Language, Translations> = {
    en: {},
    ar: {}
  };

  currentLanguage = signal<Language>(this.DEFAULT_LANGUAGE);

  constructor() {
    this.loadTranslations();
    this.initLanguage();
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private initLanguage(): void {
    if (this.isBrowser) {
      const savedLanguage = localStorage.getItem(this.STORAGE_KEY) as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        this.setLanguage(savedLanguage);
      }
    }
  }

  private loadTranslations(): void {
    this.translations = {
      en: {
        common: {
          search: 'Search...',
          save: 'Save',
          cancel: 'Cancel',
          delete: 'Delete',
          edit: 'Edit',
          add: 'Add',
          close: 'Close',
          confirm: 'Confirm',
          loading: 'Loading...',
          noData: 'No data available',
          actions: 'Actions',
          submit: 'Submit',
          reset: 'Reset',
          back: 'Back',
          next: 'Next',
          previous: 'Previous',
          yes: 'Yes',
          no: 'No',
          all: 'All',
          none: 'None',
          select: 'Select',
          required: 'Required',
          optional: 'Optional'
        },
        navbar: {
          title: 'SHIRAA Procurement Portal',
          myProfile: 'My Profile',
          settings: 'Settings',
          helpCenter: 'Help Center',
          logout: 'Logout'
        },
        sidebar: {
          mainMenu: 'MAIN MENU',
          dashboard: 'Dashboard',
          home: 'Home',
          help: 'Help',
          management: 'MANAGEMENT',
          categories: 'Categories',
          addresses: 'Addresses',
          countries: 'Countries',
          cities: 'Cities',
          suppliers: 'Suppliers',
          supplier: 'Supplier',
          registration: 'Registration',
          profile: 'Profile',
          reqs: 'REQs',
          offers: 'Offers',
          administrator: 'Administrator'
        },
        dashboard: {
          title: 'SUPPLIER REGISTRATION & PREQUALIFICATION'
        },
        auth: {
          login: 'Login',
          register: 'Register',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          forgotPassword: 'Forgot Password?',
          rememberMe: 'Remember Me',
          noAccount: "Don't have an account?",
          hasAccount: 'Already have an account?',
          signUp: 'Sign Up',
          signIn: 'Sign In',
          fullName: 'Full Name',
          phone: 'Phone Number',
          company: 'Company Name',
          termsAgree: 'I agree to the Terms and Conditions',
          loginSuccess: 'Login successful',
          registerSuccess: 'Registration successful',
          invalidCredentials: 'Invalid email or password',
          emailRequired: 'Email is required',
          passwordRequired: 'Password is required',
          invalidEmail: 'Please enter a valid email',
          passwordMinLength: 'Password must be at least 8 characters',
          passwordMismatch: 'Passwords do not match'
        },
        footer: {
          copyright: '© {year} Shiraa. All rights reserved.'
        },
        errors: {
          somethingWentWrong: 'Something went wrong',
          networkError: 'Network error. Please check your connection.',
          unauthorized: 'Unauthorized access',
          notFound: 'Resource not found',
          serverError: 'Server error. Please try again later.'
        }
      },
      ar: {
        common: {
          search: 'بحث...',
          save: 'حفظ',
          cancel: 'إلغاء',
          delete: 'حذف',
          edit: 'تعديل',
          add: 'إضافة',
          close: 'إغلاق',
          confirm: 'تأكيد',
          loading: 'جاري التحميل...',
          noData: 'لا توجد بيانات',
          actions: 'إجراءات',
          submit: 'إرسال',
          reset: 'إعادة تعيين',
          back: 'رجوع',
          next: 'التالي',
          previous: 'السابق',
          yes: 'نعم',
          no: 'لا',
          all: 'الكل',
          none: 'لا شيء',
          select: 'اختر',
          required: 'مطلوب',
          optional: 'اختياري'
        },
        navbar: {
          title: 'بوابة شراء للمشتريات',
          myProfile: 'ملفي الشخصي',
          settings: 'الإعدادات',
          helpCenter: 'مركز المساعدة',
          logout: 'تسجيل الخروج'
        },
        sidebar: {
          mainMenu: 'القائمة الرئيسية',
          dashboard: 'لوحة التحكم',
          home: 'الرئيسية',
          help: 'المساعدة',
          management: 'الإدارة',
          categories: 'الفئات',
          addresses: 'العناوين',
          countries: 'الدول',
          cities: 'المدن',
          suppliers: 'الموردين',
          supplier: 'المورد',
          registration: 'التسجيل',
          profile: 'الملف الشخصي',
          reqs: 'الطلبات',
          offers: 'العروض',
          administrator: 'المسؤول'
        },
        dashboard: {
          title: 'تسجيل الموردين والتأهيل المسبق'
        },
        auth: {
          login: 'تسجيل الدخول',
          register: 'إنشاء حساب',
          email: 'البريد الإلكتروني',
          password: 'كلمة المرور',
          confirmPassword: 'تأكيد كلمة المرور',
          forgotPassword: 'نسيت كلمة المرور؟',
          rememberMe: 'تذكرني',
          noAccount: 'ليس لديك حساب؟',
          hasAccount: 'لديك حساب بالفعل؟',
          signUp: 'إنشاء حساب',
          signIn: 'تسجيل الدخول',
          fullName: 'الاسم الكامل',
          phone: 'رقم الهاتف',
          company: 'اسم الشركة',
          termsAgree: 'أوافق على الشروط والأحكام',
          loginSuccess: 'تم تسجيل الدخول بنجاح',
          registerSuccess: 'تم التسجيل بنجاح',
          invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
          emailRequired: 'البريد الإلكتروني مطلوب',
          passwordRequired: 'كلمة المرور مطلوبة',
          invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
          passwordMinLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
          passwordMismatch: 'كلمات المرور غير متطابقة'
        },
        footer: {
          copyright: '© {year} شراء. جميع الحقوق محفوظة.'
        },
        errors: {
          somethingWentWrong: 'حدث خطأ ما',
          networkError: 'خطأ في الشبكة. يرجى التحقق من الاتصال.',
          unauthorized: 'غير مصرح بالوصول',
          notFound: 'المورد غير موجود',
          serverError: 'خطأ في الخادم. يرجى المحاولة لاحقاً.'
        }
      }
    };
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }

  getLanguage(): Language {
    return this.currentLanguage();
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLanguage);
  }

  isRtl(): boolean {
    return this.currentLanguage() === 'ar';
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: string | Translations = this.translations[this.currentLanguage()];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return this.interpolate(value, params);
    }

    return value;
  }

  private interpolate(text: string, params: Record<string, string | number>): string {
    return text.replace(/{(\w+)}/g, (_, key) => {
      return params[key]?.toString() ?? `{${key}}`;
    });
  }

  t(key: string, params?: Record<string, string | number>): string {
    return this.translate(key, params);
  }
}

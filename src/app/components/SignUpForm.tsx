"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock, Phone, MapPin, Building2, Hash, Crop, Factory, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'farmer' | 'business';
  // Farmer fields
  location: string;
  landIdentifier: string;
  raiSize: string;
  primaryCrop: string;
  // Business fields
  companyName: string;
  companyType: string;
  mainHub: string;
  businessLocation: string;
  productionCapacity: string;
  preferredBiomassType: string;
}

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'farmer',
    // Farmer fields
    location: '',
    landIdentifier: '',
    raiSize: '',
    primaryCrop: '',
    // Business fields
    companyName: '',
    companyType: '',
    mainHub: '',
    businessLocation: '',
    productionCapacity: '',
    preferredBiomassType: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setLoginType, setIsLoggedIn } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.userType === 'farmer') {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.landIdentifier.trim()) newErrors.landIdentifier = 'Land identifier is required';
      if (!formData.raiSize.trim()) newErrors.raiSize = 'Number of rai is required';
      if (!formData.primaryCrop.trim()) newErrors.primaryCrop = 'Primary crop type is required';
    } else {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.companyType.trim()) newErrors.companyType = 'Company type is required';
      if (!formData.mainHub.trim()) newErrors.mainHub = 'Main hub is required';
      if (!formData.businessLocation.trim()) newErrors.businessLocation = 'Location is required';
      if (!formData.productionCapacity.trim()) newErrors.productionCapacity = 'Production capacity is required';
      if (!formData.preferredBiomassType.trim()) newErrors.preferredBiomassType = 'Preferred biomass type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      // Set login type and logged in status in context
      setLoginType(formData.userType);
      setIsLoggedIn(true);
      
      // Navigate to appropriate page based on user type
      if (formData.userType === 'business') {
        router.push('/marketplace-business');
      } else {
        router.push('/marketplace-farmers');
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Makaset Place to get started</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Account Type</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'farmer' }))}
                  className={`p-3 text-sm font-medium rounded-md border transition-colors ${
                    formData.userType === 'farmer'
                      ? 'bg-green-50 border-green-300 text-green-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-4 h-4 mx-auto mb-1" />
                  Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
                  className={`p-3 text-sm font-medium rounded-md border transition-colors ${
                    formData.userType === 'business'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Mail className="w-4 h-4 mx-auto mb-1" />
                  Business
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Farmer-specific fields */}
            {formData.userType === 'farmer' ? (
              <>
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Your farm location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                {/* Land Identifier */}
                <div className="space-y-2">
                  <Label htmlFor="landIdentifier" className="text-sm font-medium text-gray-700">
                    Unique Land Identifier
                  </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="landIdentifier"
                      name="landIdentifier"
                      type="text"
                      placeholder="e.g., FARM-001-2024"
                      value={formData.landIdentifier}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.landIdentifier ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.landIdentifier && (
                    <p className="text-sm text-red-600">{errors.landIdentifier}</p>
                  )}
                </div>

                {/* Number of Rai */}
                <div className="space-y-2">
                  <Label htmlFor="raiSize" className="text-sm font-medium text-gray-700">
                    Number of Rai (Size)
                  </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="raiSize"
                      name="raiSize"
                      type="number"
                      placeholder="e.g., 5"
                      value={formData.raiSize}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.raiSize ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.raiSize && (
                    <p className="text-sm text-red-600">{errors.raiSize}</p>
                  )}
                </div>

                {/* Primary Crop Type */}
                <div className="space-y-2">
                  <Label htmlFor="primaryCrop" className="text-sm font-medium text-gray-700">
                    Primary Crop Type
                  </Label>
                  <div className="relative">
                    <Crop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="primaryCrop"
                      name="primaryCrop"
                      type="text"
                      placeholder="e.g., Rice, Corn, Vegetables"
                      value={formData.primaryCrop}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.primaryCrop ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.primaryCrop && (
                    <p className="text-sm text-red-600">{errors.primaryCrop}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Company Name
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Your Company Name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.companyName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                {/* Company Type */}
                <div className="space-y-2">
                  <Label htmlFor="companyType" className="text-sm font-medium text-gray-700">
                    Type of Company
                  </Label>
                  <div className="relative">
                    <Factory className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="companyType"
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleInputChange}
                      className={`w-full h-10 pl-10 pr-3 py-2 text-sm text-black bg-white border border-input rounded-md focus:outline-none ${errors.companyType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select company type</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="trading">Trading</option>
                      <option value="logistics">Logistics</option>
                      <option value="energy">Energy</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errors.companyType && (
                    <p className="text-sm text-red-600">{errors.companyType}</p>
                  )}
                </div>

                {/* Main Hub */}
                <div className="space-y-2">
                  <Label htmlFor="mainHub" className="text-sm font-medium text-gray-700">
                    Main Hub
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="mainHub"
                      name="mainHub"
                      type="text"
                      placeholder="Your main operational hub"
                      value={formData.mainHub}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.mainHub ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.mainHub && (
                    <p className="text-sm text-red-600">{errors.mainHub}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="businessLocation" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="businessLocation"
                      name="businessLocation"
                      type="text"
                      placeholder="Your company location"
                      value={formData.businessLocation}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.businessLocation ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.businessLocation && (
                    <p className="text-sm text-red-600">{errors.businessLocation}</p>
                  )}
                </div>

                {/* Production Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="productionCapacity" className="text-sm font-medium text-gray-700">
                    Production Capacity
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="productionCapacity"
                      name="productionCapacity"
                      type="text"
                      placeholder="e.g., 1000 tons/month"
                      value={formData.productionCapacity}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.productionCapacity ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.productionCapacity && (
                    <p className="text-sm text-red-600">{errors.productionCapacity}</p>
                  )}
                </div>

                {/* Preferred Biomass Type */}
                <div className="space-y-2">
                  <Label htmlFor="preferredBiomassType" className="text-sm font-medium text-gray-700">
                    Preferred Biomass Type
                  </Label>
                  <div className="relative">
                    <Crop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="preferredBiomassType"
                      name="preferredBiomassType"
                      value={formData.preferredBiomassType}
                      onChange={handleInputChange}
                      className={`w-full h-10 pl-10 pr-3 py-2 text-sm text-black bg-white border border-input rounded-md focus:outline-none ${errors.preferredBiomassType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select biomass type</option>
                      <option value="rice-husk">Rice Husk</option>
                      <option value="corn-stalks">Corn Stalks</option>
                      <option value="sugarcane-bagasse">Sugarcane Bagasse</option>
                      <option value="wood-chips">Wood Chips</option>
                      <option value="coconut-shells">Coconut Shells</option>
                      <option value="palm-oil-waste">Palm Oil Waste</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errors.preferredBiomassType && (
                    <p className="text-sm text-red-600">{errors.preferredBiomassType}</p>
                  )}
                </div>
              </>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

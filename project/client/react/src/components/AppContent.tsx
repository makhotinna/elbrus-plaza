import { Layout } from 'antd';
import TwoPlace from './Content/TwoPlaceNumber/TwoPlace';
import Lux from './Content/LuxNumber/Lux';
import ComfortNumber from './Content/ComfortNumber/ComfortNumber';
import Family from './Content/FamilyNumber/Family';
import BigHouse from './Content/BigHouse/BigHouse';
import React from 'react';

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '24px',
  minHeight: '100vh',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const sectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  scrollMarginTop: '100px'
};

const AppContent: React.FC = () => (
  <Layout.Content style={contentStyle}>
    <div id="two-place" style={sectionStyle}><TwoPlace /></div>
    <div id="lux" style={sectionStyle}><Lux /></div>
    <div id="comfort" style={sectionStyle}><ComfortNumber /></div>
    <div id="family" style={sectionStyle}><Family /></div>
    <div id="house" style={sectionStyle}><BigHouse /></div>
  </Layout.Content>
);

export default AppContent;
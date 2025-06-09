import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import ContinuationHeader from '../components/ContinuationHeader';
import AppSider from '../components/AppSider';
import AppContent from '../components/AppContent';


const ViewingNumbers: React.FC = () => {
    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            overflowX: 'hidden'
        }}>

            <Layout style={{
                width: '100%',
                margin: 0,
                padding: 0,
                background: 'transparent'
            }}>
                <>
                    <AppHeader />
                    <Layout style={{ margin: 0, padding: 0 }}>
                        <ContinuationHeader />
                    </Layout>
                    <Layout style={{
                        margin: 0,
                        padding: 0,
                        display: 'flex'
                    }}>
                        <AppSider />
                        <AppContent />
                    </Layout>
                </>
            </Layout>
        </div>
    );
};

export default ViewingNumbers;
import Category from "../components/CategoryCollections";
import { NewsletterForm } from "../components/NewsletterForm";
import Promo from "../components/Promo";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const Home = () => {
return <QueryClientProvider client={queryClient}><Promo /><Category/><NewsletterForm /></QueryClientProvider>
};

export default Home;

import useAuthContext from "../context/AuthContext";
import NewsAggregator from "../layouts/NewsAggregator";


const Home = (props) => {
    const { user } = useAuthContext(); 
    
    return (
        <div className="max-w-7xl mx-auto mt-12">
            <NewsAggregator />
        </div>
    );
};
export default Home;

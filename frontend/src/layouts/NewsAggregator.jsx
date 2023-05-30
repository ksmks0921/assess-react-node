import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const NewsAggregator = () => {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [news, setNews] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        date: '',
        category: '',
        source: 'news-api',
    });

    useEffect(() => {
        fetchNews();    
    
    }, [filterOptions])

    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevState) => ({
          ...prevState,
          [name]: value === '' ? null : value,
        }));
        if (name === 'date' && value !== '') {
            setFilterOptions((prevState) => ({
              ...prevState,
              category: '',
            }));
          } else if (name === 'category' && value !== '') {
            setFilterOptions((prevState) => ({
              ...prevState,
              date: '',
            }));
          }
    };
    
    const fetchNews = async () => {      
        console.log(filterOptions.date);
        try {
            let fromDate = "";
            let toDate = "";
            if(filterOptions.date == "today") {
                const today = new Date().toISOString().split('T')[0];
                fromDate = today
                toDate = today
            }else if (filterOptions.date == "this-week") {
                const today = new Date();
                const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days    
                fromDate = lastWeek.toISOString().split('T')[0];
                toDate = today.toISOString().split('T')[0];
            } else if(filterOptions.date == "this-month") {
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
                fromDate = `${currentYear}-${currentMonth}-01`; // Start of the month
                toDate = `${currentYear}-${currentMonth + 1}-01`;
            } 
            const response = await axios.get('/api/news', {
            params: {
                q: searchKeyword,                
                category: filterOptions.category,
                sourceId: filterOptions.source,
                from: fromDate,
                to: toDate,
            },
            });

            setNews(response.data.news);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
   
    };
    const displayContent = () => {
        if(filterOptions.source === "news-api"){
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {news.map((article, index) => (
                        <div key={index} className="bg-white shadow-md p-4">
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-4">{article.description}</p>
                        <a href={article.url} className="text-blue-500 hover:text-blue-700">
                            Read More
                        </a>
                        </div>
                    ))}
            </div>
          )
        }
        else
        if(filterOptions.source === "guardian"){
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {news.map((article, index) => (
                        <div key={index} className="bg-white shadow-md p-4">
                        <h2 className="text-xl font-bold mb-2">{article.webTitle}</h2>
                        {/* <p className="text-gray-600 mb-4">{article.description}</p> */}
                        <a href={article.url} className="text-blue-500 hover:text-blue-700">
                            Read More
                        </a>
                        </div>
                    ))}
            </div>
          )
        }
        else
        if(filterOptions.source === "nytimes"){
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {news && news.map((article, index) => (
                        <div key={index} className="bg-white shadow-md p-4">
                        {}
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-4">{article.abstract}</p>
                        <a href={article.url} className="text-blue-500 hover:text-blue-700">
                            Read More
                        </a>
                        </div>
                    ))}
            </div>
          )
        }
          
    }
    return (
    
         <div className="container mx-auto p-4">       
   
            <div className="flex flex-col sm:mb-4 mb-0 sm:flex-wrap sm:flex-row">
            {/* Search input */}
                
                <div className='w-full sm:w-1/2 md:w-1/2 w-full flex'>                    
                    <input
                        type="text"
                        className="mb-4 sm:mb-0 sm:w-2/3 md:w-1/3 p-2 rounded border border-gray-300 w-full"
                        placeholder="Search articles by keyword"
                        value={searchKeyword}
                        onChange={handleSearchInputChange}
                    />
                    <button className="mb-4 sm:mb-0 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2 mr-0" onClick={fetchNews}>Search</button>
                </div>
                <div className='w-full sm:w-1/2 sm:mr- md:w-1/2 flex flex-col sm:flex-wrap sm:flex-row'>
                                
                        <div className=' sm:w-1/2 md:w-1/3 p-0 w-full sm:pr-3'>
                            {/* Source filter */}
                            <select
                            className="w-full h-full rounded border border-gray-300 mb-4 sm:mb-0 pl-1 p-2"
                            name="source"
                            value={filterOptions.source}
                            onChange={handleFilterChange}>            
                                <option value="news-api">News</option>
                                <option value="nytimes">The New York Times</option>            
                                <option value="guardian">The Guardian</option>
                            </select>
                        </div>
                        <div className=' sm:w-1/2 md:w-1/3 p-0 w-full sm:pr-3'>
                            {/* Category filter */}
                            <select
                            className="w-full h-full rounded border border-gray-30 pl-1 mb-4 sm:mb-0 p-2"
                            name="category"
                            value={filterOptions.category}
                            onChange={handleFilterChange}>
                                <option value="">All Categories</option>                
                                <option value="sports">Sports</option>
                                <option value="health">Health</option>
                                <option value="science">Science</option>
                                <option value="business">Business</option>
                            </select>
                        </div>            
                        <div className=' sm:w-1/2 md:w-1/3 p-0 w-full sm:pr-3'>                            
                            {/* Date filter */}
                            <select
                                className="w-full h-full rounded border border-gray-30 mb-4 sm:mb-0 pl-1  p-2"
                                name="date"
                                value={filterOptions.date}
                                onChange={handleFilterChange}>
                                <option value="">All Dates</option>
                                <option value="today">Today</option>
                                <option value="this-week">This Week</option>
                                <option value="this-month">This Month</option>                
                            </select>
                        </div>           
                    
                </div>
            </div>
    
            {/* Fetch news button */}
            
            
            {/* Display news articles */}         
            {displayContent()}
       </div>
    
  );
};

export default NewsAggregator;

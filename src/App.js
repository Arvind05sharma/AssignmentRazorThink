import React, { Component } from 'react';
import './App.css';
import axios from "axios";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Searchtext: '',
            data: [],
            imagesClicked: [],
            isOpen: false,
        };
    }

    /**
     * @description: for getting the api data from the sever
     * @method : used axois configuration and GET method
     * @package: axios npm
     * @param : data : to set the api results from the url.
     * @memberof App
     */
    getData = () => {
        axios.get(`https://api.unsplash.com/search/photos?client_id=yBdll7tXv6FQzq_nK7Mi8e5yyPSq0pUqB3NHEC3bI7g&query=${this.state.Searchtext}`).then((response) => {
            this.setState({
                data: response.data.results,
            });
            console.log("App -> componentDidMount -> data", response)
        });
    }

    /**
     * @description: for handling the dialog box for popup image screen.
     * @param : e : for the event onClick 
     * @memberof App
     */
    handleShowDialog = (e) => {
        this.setState({
            isOpen: !this.state.isOpen,
            imagesClicked: this.state.data[e].urls.full
        });

    };

    /**
     * @description: for closing the dialog box/pop up. 
     * @memberof App
     */
    dialog = () => {
        this.setState({ isOpen: false })
    }
    /**
     * @description: function used for the search functionality 
     * @memberof App
     */
    searchImage = (e) => {
        this.setState({ Searchtext: e.target.value })
    }
    render() {
        return (
            <div className="Container">
                <h1 className="title">Search Image</h1>
                <div className="searchBox">
                    <input
                        type="text"
                        value={this.state.Searchtext}
                        placeholder="Search Images..."
                        onChange={(e) => this.searchImage(e)}
                    />
                    <button className="btn"
                        type='submit'
                        onClick={this.getData}>

                        Search
                    </button>
                </div>
                <section className='cards'>
                    {
                        this.state.data.length > 0 &&
                        this.state.data.map((items, i) => {
                            return <div key={i} className='card'>
                                <div className='card-inner'>
                                    <div className='card-front'>
                                        <img src={items.urls.full} alt='' onClick={() => this.handleShowDialog(i)} />

                                    </div>
                                </div>
                            </div>;
                        })
                    }
                </section>
                {this.state.isOpen && (
                    <dialog
                        className="dialog"
                        style={{ position: "absolute" }}
                        open
                    >
                        <img
                            className="image"
                            src={this.state.imagesClicked}
                            alt="no image"
                            onClick={this.dialog}
                        />
                        <button className="btn"> 
                        <a href={this.state.imagesClicked} target="_blank" download="images">
                            <i className="fas fa-download" />
                           Download File
                        </a></button>
                    </dialog>
                )}
            </div>
        )
    }
}



export default App

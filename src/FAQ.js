import React from 'react';
import Faq from "react-faq-component";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "How do you get accurate stock market data in real time?",
            content: `We get all data from the IEX cloud api at https://cloud.iexapis.com/`,
        },
        {
            title: "How are stock trends predicted?",
            content: `Stock trends are predicted using a neural network
            which generates a mathematical model. The network will exam the current stock and its past trends in relation to the 
            rest of the market and give its best prediction for whether the stock will rise or fall. `,
        },
        {
            title: "Can I trade on the platform?",
            content: "Currently this feature is not available, but may be coming soon.",
        },
        {
            title: "What other language options?",
            content: `Currently English is the only supported option. As our platform grows other languages will be added.`,
        },
        {
            title: "Is my data secure?",
            content: `Yes! Data security is very important to us. Your passwords and user names are all encrypted using a 
            secure password hashing methedology, and HTTPS makes sure all communication to our server is encrypted.`,
        },
        {
            title: "Do you record and sell user data?",
            content: `No we don't record any user data, which means of course we would never sell it either!`,
        },
        {
            title: "Don't see your question?",
            content: `Please feel free to contact us at info@mlstocksite.com`,
        },
    ],
};

const styles = {
    bgColor: 'light',
    titleTextColor: "black",
    rowTitleColor: "#0275d8",
    rowContentColor: 'black',
    arrowColor: "#d9534f",  
};

class FAQ extends React.Component {
    render() {
        return (
            <div className="container bg-light p-5 mx-auto">
                <Faq data={data} styles={styles} />
            </div>
        );
    }
}

export default FAQ
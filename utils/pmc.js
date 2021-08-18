const axios = require('axios');
const parseString = require('xml2js').parseString;

const searchInTitle = async(termString) => {
    const raiz= "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=";
    let newString = termString.replace(/ /g,"%5Btitle%5DAND%20");
    newString += "%5Btitle%5D";
    const url = raiz+newString;
    const {data} = await axios.get(url);
    var idList = null;
    parseString(data, (err, result) => {
      if(err) {
          throw err;
      }
      idList= result['eSearchResult']['IdList'][0]['Id'];
    });
    return idList;        
  }
const getDocumentByID = async(pmcId) => {
    const url= "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=8059185";
    const {data} = await axios.get(url);
    var document = {};
    parseString(data, (err, result) => {
      if(err) {
          throw err;
      }
      result=result['pmc-articleset']['article'][0]['front'][0];
      try{
        document['journal'] = result['journal-meta'][0]['journal-title-group'][0]['journal-title'][0];
      }catch(e){
        console.log('not found')        
      }
      try{
        document['doi']= result['article-meta'][0]['article-id'][3]['_'];
      }catch(e){
        console.log('not found')        
      }
      try{
        document['title']= result['article-meta'][0]['title-group'][0]['article-title'][0];
      }catch(e){
        console.log('not found')        
      }
      try{
        document['authors']= [];
        const authors = result['article-meta'][0]['contrib-group'][0]['contrib'];
        authors.forEach(author => {          
          const surnameArray=author['name'][0]['surname'];
          let surname="";
          surnameArray.forEach(name=>{
            surname += name+" ";
          })          
          const givenNameArray=author['name'][0]['given-names'];
          let givenName="";
          givenNameArray.forEach(name=>{
            givenName += name+" ";
          })
          document['authors'].push([surname.trim(),givenName.trim()])
        })
      }catch(e){
        console.log('not found')        
      }
      try{
        const pubDate= result['article-meta'][0]['pub-date'][0];
        document['pubDate']={};
        document['pubDate']['year']=pubDate['year'][0];
        document['pubDate']['month']=pubDate['month'][0];
        document['pubDate']['day']=pubDate['day'][0];
      }catch(e){
        console.log('not found')        
      }
      try{
        document['license']= result['article-meta'][0]['permissions'][0]['license'][0]['ali:license_ref'][0]['_'];
      }catch(e){
        console.log('not found')        
      }
      try{
        let abstract="";
        const abstractParagraphs= result['article-meta'][0]['abstract'][0]['sec'];        
        abstractParagraphs.forEach(paragraph =>{
          if(paragraph['p'][0]['_']){
            abstract += paragraph['p'][0]['_'];
          }
        })
        document['abstract']=abstract;
      }catch(e){
        console.log('not found')        
      }
    });
    return document;        
  }



module.exports ={searchInTitle,getDocumentByID};
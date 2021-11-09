
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import 'bootswatch/dist/flatly/bootstrap.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { stockData } from "./data";
import { BsFolderCheck, BsFolderPlus } from 'react-icons/bs';
import { AiOutlineClear, AiOutlineSearch, AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineExport } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { CgShortcut } from 'react-icons/cg';
import { VscDebugDisconnect } from 'react-icons/vsc';

import { IconContext } from "react-icons";
import logoimage from '../assets/insa.jpg';
Cytoscape.use(COSEBilkent);
class App extends React.Component {

  constructor(props) {
    super(props);


    this.handleChangebase = this.handleChangebase.bind(this);

  }


  state = {
    w: 0,
    h: 0,
    length: null,
    selected: null,
    from: null,
    to: null,
    centrality: null,
    elements: [

    ]
  }


  componentDidMount = () => {
    this.setState({
      w: window.innerWidth,
      h: window.innerHeight
    })
    this.setUpListeners()
  }

  setUpListeners = () => {

  }
  handleOpenDialogclear = (e) => {
    this.cy.$(':selected').remove();

  }
  handleOpenDialognode = (e) => {


    var aStar = this.cy.elements().aStar({
      root: `#${this.state.from}`, goal: `#${this.state.to}`
    });
    this.state.length = aStar.distance;


    if (aStar.distance >= 0) {
      aStar.path.select();
      alert('shortest path distance between the nodes is  :' + aStar.distance);
    } else {
      alert('the nodes doesnt connect  ');
    }




  }
  handleOpenDialogcentrality = (e) => {


    var selected = this.cy.getElementById(this.state.centrality);
    var x = this.cy.getElementById(this.state.centrality);
 
    //console.log('it conection is : ' + this.cy.$().dc({ root: `#${this.state.centrality}` }).degree);

    alert('its connection is: ' + this.cy.$().dc({ root: `#${this.state.centrality}` }).degree);

    var bc = this.cy.$().bc();
    //console.log('bc of j: ' + bc.betweenness(`#${this.state.centrality}`));

    selected.select();
    this.cy.center(this.state.centrality);
   // console.log(this.cy.elements());

  }
  handleOpenDialog = (e) => {
    const min = 10;
    const max = 100;
    const rand = min + Math.random() * (max - min);

    for (const [index, value] of stockData.entries()) {
      this.cy.add([
        { data: { id: ({ value }.value.caller), label: ({ value }.value.caller) }, position: { x: (50 * ({ index }.index) + 2), y: (10 * ({ index }.index) + (rand)) } },
      ])
      this.cy.add([
        { data: { id: ({ value }.value.reciver), label: ({ value }.value.reciver) }, position: { x: (50 * ({ index }.index) + 2), y: (10 * ({ index }.index)) } },
      ])
    }
    for (const [index, value] of stockData.entries()) {
      this.cy.add([
        { data: { source: ({ value }.value.caller), target: ({ value }.value.reciver), label: 'called' } }
      ])
    }
    var layout = this.cy.elements().layout({
      name: 'random'
    });
    layout.run();

  }

  onChangeFile(event) {

    // event.stopPropagation();
    // event.preventDefault();
    // var file = event.target.files[0];

    // const min = 10;
    // const max = 100;N
    // const rand = min + Math.random() * (max - min);
    // for (const [index, value] of file) {
    //   this.cy.add([
    //     { data: { id: ({ value }.value.caller), label: ({ value }.value.caller) }, position: { x: (50 * ({ index }.index) + 2), y: (10 * ({ index }.index) + (rand)) } },
    //   ])
    //   this.cy.add([
    //     { data: { id: ({ value }.value.reciver), label: ({ value }.value.reciver) }, position: { x: (50 * ({ index }.index) + 2), y: (10 * ({ index }.index)) } },
    //   ])
    // }
    // for (const [index, value] of file) {
    //   this.cy.add([
    //     { data: { source: ({ value }.value.caller), target: ({ value }.value.reciver), label: 'called' } }
    //   ])
    // }
    // var layout = this.cy.elements().layout({
    //   name: 'random'
    // });
    // layout.run();
  }
  handleOpenDialogshort = (e) => {
    var bfs = this.cy.elements().bfs({
      roots: this.cy.$(':selected'),
      visit: function (v, e, u, i, depth) {
    

        // example of finding desired node
        if (v.data('weight') < 40) {
          return true;
        }

        // example of exiting search early
        if (v.data('weight') < 0) {
          return false;
        }
      },
      directed: false
    });

    var path = bfs.path; // path to found node
    var found = bfs.found; // found node

    // select the path
    path.select();
  }
  handleOpenDialogdfs = (e) => {
    var dfs = this.cy.elements().dfs({
      roots: this.cy.$(':selected'),
      visit: function (v, e, u, i, depth) {
     

        // example of finding desired node
        if (v.data('weight') < 40) {
          return true;
        }

        // example of exiting search early
        if (v.data('weight') < 0) {
          return false;
        }
      },
      directed: false
    });

    var path = dfs.path; // path to found node
    var found = dfs.found; // found node

    // select the path
    path.select();
  }
  handleOpenDialograndomlayout = (e) => {

    var layout = this.cy.elements().layout({
      name: 'random'
    });
    layout.run();
  }
  handleChangefrom = (e) => {

    //this.setState({ selected:});
    this.state.from = e.target.value;
   

  }
  handleChangeto = (e) => {

    //this.setState({ selected:});
    this.state.to = e.target.value;


  }
  handleChangebase = (e) => {

    //this.setState({ selected:});
    this.state.selected = e.target.value;


  }
  handleChangecenter = (e) => {

    //this.setState({ selected:});
    this.state.centrality = e.target.value;


  }
  h
  handleChange = (e) => {


    var x = this.cy.getElementById(this.state.selected);

    x.select();
  }
  handleOpenDialogexport = (e) => {
   
    this.cy.json();
  }
  handleOpenDialogfour = (e) => {
    this.cy.animate({
      pan: { x: 100, y: 100 },
      zoom: 2
    }, {
      duration: 500
    });
  }
  handleOpenDialogfive = (e) => {
    this.cy.animate({
      pan: { x: 100, y: 100 },
      zoom: 0.5
    }, {
      duration: 500
    });
  }
  handleOpenDialogthree = (e) => {

  }
  render() {

    const elements = [
    ];


    return (

      <div  style={{padding: '1%'}}>

        {/* <div style={{ background: 'white', height: 800, position: 'absolute', right: 0, }}

        >
          <div style={{ height: 400, display: 'flex', ooverflow: 'scroll' }}>
            <h4 style={{ display: 'flexx', marginLeft: 30, color: '#FFFFFF' }}>Centerality  list</h4>
          </div>
          <div style={{ height: 400, display: 'flex', ooverflow: 'scroll' }}>
            <h4 style={{ display: 'flex', marginLeft: 30, color: '#FFFFFF' }}>profile</h4>
            <img src={logoimage} style={{
              width: '50 %', height: 100, borderRadius: 100 / 2,

              margin: 'auto'

            }} />

            <h5>{"\n"}</h5>

            <h5 style={{ display: 'flex', color: 'white' }}>title</h5>

            <Item
              bgColor='light'
              type='button'
              onClick={this.handleOpenDialog}
              style={{
               
                border: '5px solid red',
                background: '#dadbe3',
                marginLeft: 0,
                marginRight: 0,
               
                paddingLeft: 0,
                paddingRight: 0
              }}>
              Edit profile
             </button>
          </div>
        </div> */}
        <nav class="navbar navbar-expand-lg navbar-dark bg-light">

          <div class="btn-group mr-2" role="group" aria-label="First group">











            <button class=" form-inline btn btn-outline-primary"
              onClick={this.handleOpenDialogfour}
              style={{


                background: 'white',
                marginLeft: 0,
                marginRight: 0,

                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              <IconContext.Provider
                value={{ color: 'red', size: '20px' }}
              > < AiOutlineZoomIn />
              </IconContext.Provider>

            </button>
            <button class=" form-inline btn btn-outline-primary"
              onClick={this.handleOpenDialogfive}
              style={{


                background: 'white',
                marginLeft: 0,
                marginRight: 0,

                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              <IconContext.Provider
                value={{ color: 'red', size: '20px' }}
              > < AiOutlineZoomOut />
              </IconContext.Provider>
            </button>
            <button class=" form-inline btn btn-outline-primary"
              onClick={this.handleOpenDialogcentrality}
              style={{


                background: 'white',
                marginLeft: 0,
                marginRight: 0,

                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              TAP
             </button>

            <button class=" form-inline btn btn-outline-primary"
              onClick={this.handleOpenDialograndomlayout}
              style={{


                background: 'white',
                marginLeft: 0,
                marginRight: 0,

                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              <IconContext.Provider
                value={{ color: 'red', size: '20px' }}
              > < FaRandom />

              </IconContext.Provider>
            </button>
            <button class=" form-inline btn btn-outline-primary"
              onClick={this.handleOpenDialogexport}
              style={{


                background: 'white',
                marginLeft: 0,
                marginRight: 0,

                paddingLeft: 20,
                paddingRight: 20
              }}
            >    <IconContext.Provider
              value={{ color: 'red', size: '20px' }}
            ><AiOutlineExport />

              </IconContext.Provider>
            </button>
          </div>

        </nav>
        <nav class="navbar navbar-expand-lg navbar-dark bg-light">
          <div class="btn-group mr-2" role="group" aria-label="First group">

            <input
              style={{
                borderRadius: 10,
                marginLeft: 10,
                marginRight: 10,
                width: '80%',
                paddingLeft: 0,
                paddingRight: 0
              }}
              class="form-control mr-sm-2" type="text" onChange={this.handleChangefrom} value={this.state.from} placeholder="from" />
            <input
              style={{
                borderRadius: 10,
                marginLeft: 10,
                marginRight: 10,
                width: '80%',
                paddingLeft: 0,
                paddingRight: 0
              }}
              class="form-control mr-sm-2" type="text" onChange={this.handleChangeto} value={this.state.to} placeholder="to" />


            <button class=" form-inline btn btn-outline-primary"
              onClick={this.handleOpenDialognode}
              style={{
                borderRadius: 10,
                border: '5px Blue Back',
                background: 'white',
                marginLeft: 10,
                marginRight: 10,
                width: '20%',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >

              <IconContext.Provider
                value={{ color: 'red', size: '20px' }}
              > <CgShortcut />
              </IconContext.Provider>
            </button>

            <input style={{

              marginLeft: 10,
              marginRight: 10,
              width: '80%',
              paddingLeft: 0,
              paddingRight: 0
            }} class="form-control mr-sm-2" type="text" onChange={this.handleChangecenter} value={this.state.centrality} placeholder="centirality  " />
            <button bgColor='light' type='button' onClick={this.handleOpenDialogcentrality} type="submit"
              style={{


                background: 'white',
                marginLeft: 10,
                marginRight: 10,

                paddingLeft: 0,
                paddingRight: 0
              }}>
              <IconContext.Provider
                value={{ color: 'red', size: '20px' }}
              > <VscDebugDisconnect />

              </IconContext.Provider>

            </button>

          </div>
        </nav>



        <CytoscapeComponent
          elements={this.state.elements}

          style={{
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#dfc2ba',
              'target-arrow-color': 'c8aea7',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
          {
            'line-color': '#dfc2ba',
            left: '0%',
            width: '100%', height: '600px', paddingTop: 0

          }}
          cy={(cy) => {
            this.cy = cy
            this.cy.on('tap', 'node', function (event) {
              // target holds a reference to the originator
              // of the event (core or element)
              var evtTarget = event.target;
              var node = event.target;
             
            });
          }}

        />

      </div >
    );

  }
}
export default App;

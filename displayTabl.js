import React,{ Component } from 'react';
import moment from 'moment';
import './display.css';

class DisplayTable extends Component{

    constructor(props){
        super(props)
        this.state ={
            list:[]
        }
  
        this.callAPI();
    }
    callAPI(){
        fetch("https://demo.4pointx.com/_notebooks/notebooks/_all",{
            method: 'get',
            headers:{
                'Authorization': 'Basic YWRtaW46OGtRM1VuVlVtU2dUWTBSWQ=='
            }
        }).then(
            (response)=>response.json()
        ).then((data)=>{
            console.log(data)
            this.setState({
                list:data
            })
        })

    }
    render(){

        let tb_data = this.state.list.map((item)=>{
       return(
        <tr key={item.notebook_name}>
            <td>{item.notebook_name}</td>
            <td>{item.updated_at? moment(item.updated_at).format('MMM DD YYYY hh:mm A'):"-"}</td>
            <td>{item.updated_by}</td>
            <td>{item.created_at? moment(item.created_at).format('MMM DD YYYY hh:mm A'):"-"}</td>
            <td>{item.last_run? moment(item.last_run).format('MMM DD YYYY hh:mm A'):"-"}</td>
            <td>{item.created_by}</td>
            <td>{item.no_of_runs}</td>
            <td>{item.notebook_id}</td>
            <td>{item.status}</td> 

        </tr>
       )
        })
        console.log(tb_data);
        let header = (
            <thead>
              <tr>
                <th>Notebook Name</th>
                <th>Updated At</th>
                <th>Updated By</th>
                <th>Created At</th>
                <th>Last Run</th>
                <th>Created By</th>
                <th>No. of Runs</th>
                <th>Notebook ID</th>
                <th>Status</th>
              </tr>
            </thead>
          );
        return(
        <div>
            <table>
                {header}
                <tbody>
                    {tb_data}

                </tbody>
            </table>

        </div>
        )
    }
}

export default DisplayTable
import React from "react";



export default class GameWindow extends React.Component {
  

    constructor(props) {
     
        super(props)

        this.state = {

            grid: this.generateGrid(),
            auxiliaryGrid: this.generateGrid(),
            buttom:false,
            label:"iniciar jogo"
        }
    }
    
    checknNeighbors(grid,i,j,lineSize,columnSize)
    {   
            
          let countNeighbors = 0
          let matrizAuxiliar;

          if(this.state.auxiliaryGrid.length>0)
          {
              this.setState({auxiliaryGrid:this.generateGrid()})
          }

          matrizAuxiliar = this.state.auxiliaryGrid;
         
        
           if((i+1<lineSize)&&(grid[i+1][j]))
           {
            countNeighbors++;
            
           }
        
           if((i-1>=0)&&(grid[i-1][j]) )
           {
            console.log("aqui")
            countNeighbors++;
           }
        
           if((j+1<columnSize)&&(grid[i][j+1]) )
           {
             countNeighbors++;
           }
        
           if(((j-1>=0)) && grid[i][j-1])
           {
            countNeighbors++;
           }
        
           if( (i+1<lineSize) &&(j+1<columnSize)&&(grid[i+1][j+1])  )
           {
            countNeighbors++;
           }
        
           if((i-1>=0) &&(j+1<columnSize)&&(grid[i-1][j+1]) )
           {
            countNeighbors++;
           }
        
           if( (i+1<lineSize) &&(j-1>=0)&&(grid[i+1][j-1]) )
           {
            countNeighbors++;
           }
        
           
           if((i-1>=0) &&(j-1>=0)&&(grid[i-1][j-1]) )
           {
            countNeighbors++;
           }
        
           
          if(grid[i][j])
          {
            if((countNeighbors>3) || (countNeighbors<2))
            {
              
              matrizAuxiliar[i][j]=false;
              this.setState({auxiliaryGrid:matrizAuxiliar});
              
            }
            else
            {
                matrizAuxiliar[i][j]=true;
                this.setState({auxiliaryGrid:matrizAuxiliar});
            }
          }
            
           
           if((grid[i][j]===false) && (countNeighbors===3))
           {
                    console.log(`${i}--${j}`)
                    matrizAuxiliar[i][j]=true;
                    this.setState({auxiliaryGrid:matrizAuxiliar});
                     
           }
       
    }

    run(grid)
    {   
        grid.map((line,lineIndex)=>{
           return line.map((column,columnIndex)=>{
               return this.checknNeighbors(grid,lineIndex,columnIndex,50,50)
            })
        })
    }

  
    generateGrid() {
        
        let celulas=[]
        for (let i = 0; i < 50; i++) {
            celulas[i]=[]
            for (let j = 0; j < 50; j++) {
                celulas[i][j] = false;

            }
        }
        return celulas;
    }


    setButtom(estateButtom)
    {
        this.setState({buttom:estateButtom})
    }

    setLabel(text)
    {
        this.setState({label:text})
    }

    deleteStates(text)
    {
        this.setState({label:text})
        this.setState({grid:this.generateGrid()})
        this.setState({auxiliaryGrid:this.generateGrid()})
    }

    render() {
       
        return (
            <>
            <div className="buttomContainer">
            <buttom  className="buttom"onClick={()=>{
                this.run(this.state.grid)
                this.setState({grid:this.state.auxiliaryGrid})
                this.setButtom(true)
                this.setLabel("trocar imagem")
            }} >{this.state.label}</buttom>
                {
                    this.state.buttom?<buttom className="buttom" onClick={()=>{this.deleteStates()
                    this.setLabel("iniciar jogo")
                    this.setButtom(false)}}>apagar</buttom>:null
                }
            </div>
            <div className="container">
        
            <table className="borderTable" >
                <tbody >
                    {     
                    this.state.grid.map((line, lineIndex) =>
                        <tr className="borderTable" key={lineIndex} style={{boder:"2px solid black"}}>
                            {line.map((column,columnIndex)=>{
                                return(
                                    <td key={columnIndex} 
                                    onClick={
                                        (e)=>{

                                        let copiaState = this.state.grid
                                        copiaState[lineIndex][columnIndex]=true;
                                       
                                        this.setState(copiaState)
                                        
                                        }}  style={{height:"20px",width:"20px",border:"2px solid black" ,backgroundColor:this.state.grid[lineIndex][columnIndex]?"red":""}}></td>
                                )
                            })}
                        </tr>
                    )}
                </tbody>
            </table></div></>)
    }
}
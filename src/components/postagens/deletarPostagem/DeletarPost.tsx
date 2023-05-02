import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../model/Postagem";
import { buscaId, deleteId } from "../../../services/Service";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from 'react-toastify';

function DeletarPost(){
    
    let navigate = useNavigate();

    const {id} = useParams<{id:string}>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
  
    const [post, setPosts] = useState<Postagem>()
  
    useEffect(() => {
      if (token == "") {
        toast.error('Você precisa estar logado', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
          progress: undefined,
      });
      navigate("/login")
  
      }
  }, [token])
  
    useEffect(()=>{
    if (id !== undefined){
        findById(id)
    }
   }, [id])
  
   async function findById(id:string) {
    buscaId(`/postagens/${id}`, setPosts,{
        headers: {
            "Authorization": token
        }
    })
   }
  
   function sim() {
    navigate('/posts')
      deleteId(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      toast.success('Postagem deletada com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
        progress: undefined,
    });
    }

   function nao(){
    navigate("/posts")
   }
  
    return (
      <>
      
        <Box m={2}>
          <Card variant="outlined" >
            <CardContent>
              <Box justifyContent="center">
                <Typography color="textSecondary" gutterBottom>
                  Deseja deletar a Postagem:
                </Typography>
                <Typography color="textSecondary" >
                {post?.informacoes}
                </Typography>
              </Box>
  
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
                </Box>
                <Box>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </>
    );
   }

export default DeletarPost;

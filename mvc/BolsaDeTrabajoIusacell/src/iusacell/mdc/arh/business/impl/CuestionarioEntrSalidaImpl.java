package iusacell.mdc.arh.business.impl;

import iusacell.mdc.arh.business.ICuestionarioEntrSalida;
import iusacell.mdc.arh.util.Reflection;
import iusacell.mdc.arh.vo.CuestionarioVO;
import iusacell.mdc.arh.vo.EntrevistaSalidaVO;

import java.util.ArrayList;
import java.util.List;


public class CuestionarioEntrSalidaImpl implements ICuestionarioEntrSalida {
    
    private static final String RADIO_BUTTON = "radio";
    private static final String CHECK_BOX = "checkbox";
    private static final String INPUT_TEXT = "text";
    private static final String INPUT = "input";
    private static final String TABLE = "table";
    private static final String COMBO_BOX = "select";
    private static final String INPUT_BUTTON = "button";
    
    @Override
    public String obtenerCuestionario(List<CuestionarioVO> preguntas, List<CuestionarioVO> opciones) {
        
        String cuestionario="<div id='divEntrevista' align='left' style='width: 1200px; height: 400px; overflow-y: scroll; margin-top: 20px; -webkit-box-shadow: #ABABAB 0 3px 10px; -moz-box-shadow: #ABABAB 0 3px 10px; box-shadow: " +
			"#ABABAB 0 3px 10px;-moz-border-radius: 7px; background: #FFFFFF;' >";
        cuestionario += "<div id='contEntrevista' style='padding-top: 15px; padding-left: 15px; -webkit-box-shadow: #ABABAB 0 3px 10px; -moz-box-shadow: #ABABAB 0 3px 10px; box-shadow: " +
			"#ABABAB 0 3px 10px;-moz-border-radius: 7px; background: #FFFFFF;' >";
        List<Object> genOpts;
        String tipo="";
        int idOpt=0;
        
        //tamaño preguntas 10
        for (CuestionarioVO preg : preguntas) {
            genOpts =  new ArrayList<Object>();
            //creamos pregunta
            cuestionario += obtenerLabelsPreguntas(preg.getID_PREGUNTA(), preg.getDESC_PREGUNTA());
            
            //Obtener Lista de Opciones
            for (CuestionarioVO opt : opciones) {
                if(Integer.parseInt(opt.getID_PREGUNTA()) == Integer.parseInt(preg.getID_PREGUNTA()) ){
                    tipo = opt.getTIPO();
                    
                    if(!opt.getCAMPO_EXTRA().equals("null") && opt.getCAMPO_EXTRA().equals(INPUT)){
                        idOpt = Integer.parseInt(opt.getID_OPC());
                        genOpts.add( opt.getID_PREGUNTA() + "&&" + opt.getDESC_OPCION() +"&&"+ idOpt);
                        
                    } else if(!opt.getCAMPO_EXTRA().equals("null") && opt.getTIPO().equals(TABLE)){
                        genOpts.add( opt.getID_PREGUNTA() + "&&" + opt.getDESC_OPCION() +"&&"+ opt.getOPCIONES());
                        
                    } else {
                        genOpts.add( opt.getID_PREGUNTA() + "&&" + opt.getDESC_OPCION()) ;    
                        
                    }
                    
                }
                
            }
            
            //Validar el tipo de objeto correspondiente a las opciones
            if( tipo.equals(COMBO_BOX) ){
                cuestionario += obtenerCombos(genOpts, 1);
                
            } else if( tipo.equals(RADIO_BUTTON) ){
                
                if( idOpt != 0 ){
                    cuestionario += obtenerRadioInput(genOpts, idOpt);
                    //cuestionario += "</br>";
                    
                } else {
                    cuestionario += obtenerRadioButtons(genOpts);
                    
                }
                
            } else if( tipo.equals(CHECK_BOX) ){
                cuestionario += obtenerCheckBox(genOpts);
                
            } else if( tipo.equals(TABLE) ){
                cuestionario += obtenerTabla(genOpts);
                
            } else if( tipo.equals(INPUT) ){
                cuestionario += obtenerInputText(genOpts);
                
            }
            cuestionario += "</br>";
        }        
        cuestionario += "</div>";
        cuestionario += "</div>";
        
        cuestionario += crearBoton("btnGuardar", "guardaCuestionario();", "btnGuardar", "Guardar");
        
        return cuestionario;
    }
    
    
    @Override
    public String cnosultarCuestionarioResp(List<CuestionarioVO> preguntas, List<CuestionarioVO> opciones, EntrevistaSalidaVO entrevista) {
        
        String cuestionario="<div id='divEntrevista' align='left' style='width: 1200px; height: 400px; overflow-y: scroll; margin-top: 20px; -webkit-box-shadow: #ABABAB 0 3px 10px; -moz-box-shadow: #ABABAB 0 3px 10px; box-shadow: " +
			"#ABABAB 0 3px 10px;-moz-border-radius: 7px; background: #FFFFFF;' >";
        cuestionario += "<div id='contEntrevista' style='padding-top: 15px; padding-left: 15px; -webkit-box-shadow: #ABABAB 0 3px 10px; -moz-box-shadow: #ABABAB 0 3px 10px; box-shadow: " +
			"#ABABAB 0 3px 10px;-moz-border-radius: 7px; background: #FFFFFF;' >";
        List<Object> genOpts;
        String[] camposSap={};
        String tipo="";

        //tamaño preguntas 10
        for (CuestionarioVO preg : preguntas) {
            genOpts =  new ArrayList<Object>();
            camposSap = preg.getCAMPOS_SAP().split(",");
            
            //creamos pregunta
            cuestionario += obtenerLabelsPreguntas(preg.getID_PREGUNTA(), preg.getDESC_PREGUNTA());
            
            //Obtener Lista de Opciones
            for (CuestionarioVO opt : opciones) {
                if(Integer.parseInt(opt.getID_PREGUNTA()) == Integer.parseInt(preg.getID_PREGUNTA()) ){
                    tipo = opt.getTIPO();
                    if(!opt.getCAMPO_EXTRA().equals("null") && opt.getTIPO().equals(TABLE)){
                        genOpts.add( opt.getID_PREGUNTA() + "&&" + opt.getDESC_OPCION() +"&&"+ opt.getOPCIONES());
                    } else {
                        genOpts.add( opt.getID_PREGUNTA() + "&&" + opt.getDESC_OPCION());
                    }
                    
                }
                
            }
            
            String[] respuestas= {};
            try {
            	System.out.println("Inicia Metodo Obtener respuestas SAP");
                respuestas = obtenerRespuestasSap(entrevista, camposSap);
                System.out.println("Finaliza Obtener respuestas sap:" + respuestas);
            } catch (Exception e) {
                System.out.println("Error al traer las respuestas de SAP"+e);
            }
            
            if( tipo.equals(TABLE) ){
                cuestionario += obtenerRespuestas(respuestas, genOpts);
                
            } else {
                
                cuestionario += obtenerRespuestas(genOpts, respuestas);
            }
            
            cuestionario += "</br>";
        }        
        cuestionario += "</div>";
        cuestionario += "</div>";
        
        return cuestionario;
        
    }
    
    // Preguntas
    private String obtenerLabelsPreguntas(String id, String value){
        String it="";
        
        it += "<label style='color: #AF0A0A;' class='texto_10pt_black' >"+ id + ".- " + value + "</label></br>";
        
        return it;
    }
    
    private String obtenerRespuestas(List<Object> obj_data, String[] respuestas){
        String resp="";
        String id = obj_data.get(0).toString().split("&&")[0];
        resp += "<div id='opc_preg"+id+"' style='margin-top: 10px; margin-left: 30px' >";
        for (int i = 0; i < respuestas.length; i++) {
            int len = respuestas.length;
            if(len==1 || len==3){
                resp += "<label class='texto_10pt_normal' style='font-weight: bold;' >" + respuestas[i] + "</label></br>";
                
            } else if(len==2){
                if(!respuestas[0].equals("") && !respuestas[1].equals("") ){
                    resp += "<label class='texto_10pt_normal' style='font-weight: bold;' >" + respuestas[0] + ", "+ respuestas[1] +"</label></br>";
                    break;
                } else {
                    resp += "<label class='texto_10pt_normal' style='font-weight: bold;' >" + respuestas[0] + "</label>";
                    break;
                }
                
            } 

        }
        resp += "</div>";
        return resp;
    }
    
    private String obtenerRespuestas(String[] respuestas, List<Object> table_data){        
        String rb="";
        String[] p=null;
        //p[0] = id_pregunta
        //p[1] = Preguta
        String id_preg = table_data.get(0).toString().split("&&")[0];
        rb += "<input type='hidden' id='pregunta"+id_preg+"' value='' />";
        rb += "<div id='opc_preg"+id_preg+"' style='margin-top: 10px; margin-left: 30px' >";
        rb += "<table id='tabla"+id_preg+"' style='width:90%;' class='contenedor_tabla'>";
        int f = 0;
        for (int i = 0; i < table_data.size(); i++) {
            p = table_data.get(i).toString().split("&&");
            //rb += "<tr>";
            //String[] opc = p[2].split(",");
            
            if(f==0){
                rb += "<thead><tr>";
                rb += "<th align='center' class='titulo_colum_arh' > Aspectos </th>";
                rb += "<th align='center' class='titulo_colum_arh' > Respuesta </th>";
                
                f=1;
                rb += "</tr><tbody id='mytbody'>";
            }
            
            rb += "<tr>";
            rb += "<input type='hidden' style='display: none'; id='"+(i+1)+"' value=''></input>";
            rb += "<td style='padding-left: 10px; text-align: left; font-weight: bold; ' class='texto_10pt_normal' >"+ p[1] +"</td>";
            
            rb += "<td align='center'><label class='texto_10pt_normal' style='font-weight: bold;'>" + respuestas[i] + "</label></td>";
                
            rb += "</tr>";
        }
        
        rb += "</tbody></table></div>";      
        
        return rb;
    }
    
    //Opciones de uno mas combos 
    private String obtenerCombos(List<Object> combo_data, int nivel){
        String cmb="";
        String opc_preg = "opc_preg";
        String get_selected = "get_selected_";
        String[] p=new String[combo_data.size()];
        String id_preg = combo_data.get(0).toString().split("&&")[0]; 
        p = combo_data.get(0).toString().split("&&");
        String cls = "uno";
        cmb += "<input type='hidden' id='pregunta"+id_preg+"' value='' />";
        cmb += "<div id='"+opc_preg+"'"+id_preg+"' style='margin-top: 10px; margin-left: 30px' class='texto_10pt_normal'>";
        if(nivel==1){
            cmb += "<select id='select"+p[0]+"' name='pregunta"+p[0]+"' class='select' style='text-align: center;' onchange='"+get_selected+opc_preg+id_preg+"();' >" +
                    "<option value='0' class='"+cls+"' >:: SELECCIONA ::</option>";
        } else if(nivel==2){
            cmb += "<select id='opciones"+p[0]+"' name='opciones"+p[0]+"' class='select' style='text-align: center;' >" +
                    "<option value='0' class='"+cls+"' >:: SELECCIONA ::</option>";
            
        }
        cls = "dos";
        for (int i = 0; i < combo_data.size(); i++) {
            p = combo_data.get(i).toString().split("&&");
            cmb += "<option value='"+(i+1)+"' class='"+cls+"' >"+ p[1] +"</option>";
            cls = (cls.equals("uno")) ? "dos" : "uno";
        }
        
        cmb += "</select></br></div>";
        
        return cmb;
    }
    
    private String obtenerRadioButtons(List<Object> radio_data){
        String rb = "";
        String[] p=null;
        //p[0] = id_pregunta
        //p[1] = Preguta
        String id_preg = radio_data.get(0).toString().split("&&")[0];
        rb += "<input type='hidden' id='pregunta"+id_preg+"' value='' />";
        rb += "<div id='opc_preg"+id_preg+"' style='margin-top: 10px; margin-left: 30px' class='texto_10pt_normal'>";
        for (int i = 0; i < radio_data.size(); i++) {
            p = radio_data.get(i).toString().split("&&");
            rb += "<input type='"+RADIO_BUTTON+"' name='pregunta"+p[0]+"' value='"+i+"' style='margin-left: 5px' >"+p[1]+"</br>";
        }
        rb += "</div>";
        return rb;
    }
    
    private String obtenerCheckBox(List<Object> check_data){
        String rb = "";
        String[] p=null;
        //p[0] = id_pregunta
        //p[1] = Preguta
        String id_preg = check_data.get(0).toString().split("&&")[0];
        rb += "<input type='hidden' id='pregunta"+id_preg+"' value='' >";        
        rb += "<div id='opc_preg"+id_preg+"' style='margin-top: 10px; margin-left: 30px' class='texto_10pt_normal'>";
        for (int i = 0; i < check_data.size(); i++) {
            p = check_data.get(i).toString().split("&&");
            rb += "<input type='"+CHECK_BOX+"' name='pregunta"+p[0]+"' value='"+i+"' style='margin-left: 5px'>"+p[1]+"</br>";
        }
        rb += "</div>";
        return rb;
    }
    
    private String obtenerRadioInput(List<Object>radioinput_data, int idopt){
        String rb="";
        String[] p=null;
        //p[0] = id_pregunta
        //p[1] = Preguta
        String id_preg = radioinput_data.get(0).toString().split("&&")[0];
        rb += "<input type='hidden' id='pregunta"+id_preg+"' value='' />";
        rb += "<div id='opc_preg"+id_preg+"' style='margin-top: 10px; margin-left: 30px' class='texto_10pt_normal' >";
        for (int i = 0; i < radioinput_data.size(); i++) {
            p = radioinput_data.get(i).toString().split("&&");
            
            if(p[1].indexOf("¿") != -1 ) {
                rb += "<input type='"+RADIO_BUTTON+"' name='pregunta"+p[0]+"' value='"+i+"'>" + p[1];
            } else {
                rb += "<input type='"+RADIO_BUTTON+"' name='pregunta"+p[0]+"' value='"+i+"'>" + p[1];
            }
            
            if( p.length > 2 ){
                rb += "<input type='"+INPUT_TEXT+"' id='input"+p[2]+"' name='input"+p[2]+"' value='' style='margin-left: 5px' />" ;
            }
            rb += "<br>";
            
        }
        
        rb += "</div>";
        
        return rb;
    }
    
    private String obtenerTabla(List<Object> table_data){
        String rb="";
        String[] p=null;
        //p[0] = id_pregunta
        //p[1] = Preguta
        String id_preg = table_data.get(0).toString().split("&&")[0];
        rb += "<input type='hidden' id='pregunta"+id_preg+"' value='' />";
        rb += "<div id='opc_preg"+id_preg+"' style='margin-top: 10px; margin-left: 30px' >";
        rb += "<table id='tabla"+id_preg+"' style='width:90%;' class='contenedor_tabla'>";
        int f = 0;
        for (int i = 0; i < table_data.size(); i++) {
            p = table_data.get(i).toString().split("&&");
            //rb += "<tr>";
            String[] opc = p[2].split(",");
            
            if(f==0){
                rb += "<thead><tr>";
                //rb += "<th align='center' style='width: 40px'> id </th>";
                rb += "<th align='center' class='titulo_colum_arh' > Aspectos </th>";
                for (int j = 0; j < opc.length; j++) {
                    rb += "<th align='center' class='titulo_colum_arh'>"+ opc[j].replaceAll(" ", "") +"</th>";
                }
                f=1;
                rb += "</thead></tr><tbody id='mytbody'>";
            }
            
            rb += "<tr>";
            rb += "<input type='hidden' id='"+(i+1)+"' value=''></input>";
            rb += "<td style='padding-left: 10px; text-align: left;' class='texto_10pt_normal'>"+ p[1] +"</td>";
            for (int j = 0; j < opc.length; j++) {
                rb += "<td align='center'>"+ "<input type='"+RADIO_BUTTON+"' name='opc_fila"+ i +"' value='"+opc[j].replaceAll(" ", "")+"' onclick='seleccionarValor(this);'></td>";
            }
            
            rb += "</tr>";
        }
        
        rb += "</tbody></table></div>";
        
        return rb;
    }
    
    private String obtenerInputText(List<Object> textarea_data){
        String ta="";
//        String[] p=null;
        String id_preg = textarea_data.get(0).toString().split("&&")[0];
        //p[0] = id_pregunta
        //p[1] = Preguta
        ta += "<input type='hidden' id='pregunta"+id_preg+"' value='' />";
        ta += "<div id='opc_preg"+id_preg+"' style='margin-top: 10px; margin-left: 30px' >";
        
        for (int i = 0; i < textarea_data.size(); i++) {
            //p = textarea_data.get(i).toString().split("&&");
            ta += "<input type='"+INPUT_TEXT+"' id='input_preg"+id_preg+"' name='pregunta"+id_preg+"' value='' style='width: 450px'></input>";
            
        }

        ta += "</div>";
        
        return ta;
    }
    
    private String crearBoton(String id, String event, String value, String name){
        String btn="<input id='"+id+"' type='"+INPUT_BUTTON+"' style='margin-top: 10px' class='cssButton' onclick='"+event+"' value='"+name+"'>";
            
        return btn;
    }

    private String[] obtenerRespuestasSap( EntrevistaSalidaVO vo, String[] camposSap ) throws Exception {
        String[] respuestas= new String[camposSap.length];
//        Object[] objs = null;
//        ValueObject voNuevo = null;
//        Object respuesta=null;
        
        try{
            
            for (int i = 0; i < camposSap.length; i++) {
                Reflection rf = new Reflection( vo.getClass().getName() );
                String metodo = rf.getMethod("get"+camposSap[i]);
                respuestas[i] = rf.getValorMetodo(metodo, vo).toString();
                
            }
            
        } catch(Exception exc) {
            throw new Exception("ERROR_RFC");
        }
        
        return respuestas;
    }
    
}

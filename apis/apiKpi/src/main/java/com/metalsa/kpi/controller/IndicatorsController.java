/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.controller;

import com.metalsa.kpi.dto.*;
import com.metalsa.kpi.entity.Asset;
import com.metalsa.kpi.entity.Shift;
import com.metalsa.kpi.entity.Tool;
import com.metalsa.kpi.entity.WorkOrder;
import com.metalsa.kpi.entity.custom.ToolsDataSet;
import com.metalsa.kpi.repository.*;
import com.metalsa.kpi.util.Util;
import org.apache.commons.lang3.SerializationUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 *
 * @author marcos.ramirez
 */
@RestController
@RequestMapping("/api/v1/kpi")
@CrossOrigin
public class IndicatorsController {

    private static final String DOWNTIME = "1";
    private static final String CHANGEOVER = "2";
    private static final Integer APODACA_OAXPR_GOAL = 85;
    private static final Integer APODACA_CHANGEOVER_GOAL = 17;
    private static final Double APODACA_DOWNTIME_GOAL = 9.6;
    private static final String BLUE_INDICATOR_COLOR = "#0099ED" ;
    private static final String RED_INDICATOR_COLOR = "#D31D00" ;
    private static final String GREEN_INDICATOR_COLOR = "#008A00";
    private static final String INICIO_TURNO_APODACA = "06:00" ;
    private static final String INICIO_TURNO_ETOWN = "10:30" ;
    private static int UTC_HOUR = 0 ;

    
    private static final String OP_COLOR = "#002FEE";
    private static final String MTTO_COLOR = "#FF1F00";
    private static final String HTAS_COLOR = "#3D8735";
    private static final String CAL_COLOR = "#B3B3B3";
    private static final String LOG_COLOR = "#FF8126";

    Map<String,String> departamentoColores = new HashMap<String,String>() {
        {
            put("OP", OP_COLOR);
            put("MTO", MTTO_COLOR);
            put("HTA", HTAS_COLOR);
            put("CAL", CAL_COLOR);
            put("LOG", LOG_COLOR);
            put("QTY", CAL_COLOR);
            put("TLN", HTAS_COLOR);
            put("MNT", MTTO_COLOR);
            put("PRO", OP_COLOR);
            
        }
    };
  


    @PersistenceContext
    private EntityManager em;

    @Autowired
    WorkOrderDetailRepository workOrderDetailRepository;

    @Autowired
    WorkOrderByDayRepository workOrderByDayRepository;

    @Autowired
    WorkOrderByHourRepository workOrderByHourRepository;

    @Autowired
    WorkOrderRepository workOrderRepository;

    @Autowired
    private ToolRepository toolRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueTypeRepository issueTypeRepository;

    @Autowired
    private ShiftRepository shiftRepo;
    
    private final Logger LOGGER = Logger.getLogger(this.getClass());


    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/stamping-primary/{startAt}/{endAt}/{asset}/{tool}", method = RequestMethod.GET)
    public PrimaryIndicatorsDTO getfirst(@PathVariable("plant") String plant,
        @PathVariable("startAt") String startAt, @PathVariable("endAt") String endAt,@PathVariable("asset") String asset,@PathVariable("tool") String tool){
        PrimaryIndicatorsDTO res;
        DateUTC fechas;
        if(startAt.equals("lastProductionDay")){
            Map<String,String> lastDate = getLastProductiveDay(plant);
            startAt = lastDate.get("lastProductiveDay");
            endAt = lastDate.get("lastProductiveDay");
        }
        fechas =  getAssetDate(startAt, endAt, asset);
        res = getKPIS(fechas.getStart(),fechas.getEnd(),fechas.getFirstDayDate(),fechas.getLastDayDate(), asset, tool);
        res.setStatus("OK");
        res.setMessage("Correcto");
        
        return res;
    }
    


    public Map<String,Date> getShiftByPlant(@PathVariable("asset") String asset){
        TreeMap<String,Date> res = new TreeMap<>();
        if(asset.equals("todas")) //Es el mismo turno para ambas prensas
        {
               asset = "1";
        }
        List<Shift> data = shiftRepo.findByOrganizationSchemaId(asset);
        data.sort(Comparator.comparing(Shift::getLevel));
        res.put("end",data.get(data.size()-1).getEndAt());
        res.put("start", data.get(0).getStartAt());
        return res;
    }
    
    public DateUTC getAssetDate(String start, String end, String asset){
        DateUTC res = new DateUTC();
        try{
            
            Map<String,Date> shifts = getShiftByPlant(asset);
            LocalDateTime shiftStart = Util.toLocalDate(shifts.get("start"));
            LocalDateTime shiftEnd = Util.toLocalDate(shifts.get("end"));
            Date sDate = new SimpleDateFormat("yyyy-MM-dd").parse(start);
            Date eDate = new SimpleDateFormat("yyyy-MM-dd").parse(end);
            updateUTCHour(asset);


            LocalDateTime finalStart = Util.toLocalDate(getTimeZone("",sDate)).plusHours(shiftStart.getHour()+UTC_HOUR).plusMinutes(shiftStart.getMinute()).plusSeconds(shiftStart.getSecond());
            // ESto debe hacerse genérico.
            //Este caso Etown (Se debe generar una solución general)
            if(shiftStart.getHour()+UTC_HOUR > 24)
               finalStart = finalStart.minusDays(1);

            LocalDateTime finalEnd = Util.toLocalDate(getTimeZone("",eDate)).plusHours(shiftEnd.getHour()+UTC_HOUR).plusMinutes(shiftEnd.getMinute()).plusSeconds(shiftEnd.getSecond());
            //Este caso Etown (Se debe generar una solución general)
            //Este caso Apodaca
            if(!(shiftStart.getHour()+UTC_HOUR > 24))
                finalEnd = finalEnd.plusDays(1);

            res.setFirstDayDate(Util.toDate(finalStart));
            res.setStart(Util.toDate(finalStart));
            res.setEnd(Util.toDate(finalEnd));
            res.setLastDayDate(Util.toDate(finalEnd));
            if(sDate.compareTo(eDate) == 0){
                res.setFirstDayDate(Util.toDate(finalStart.withDayOfMonth(1)));
                if(finalStart.getMonth().getValue() != Util.toLocalDate(new Date()).getMonth().getValue()){
                    res.setLastDayDate(Util.toDate(finalEnd.withMonth(finalStart.getMonthValue()+1).withDayOfMonth(1)));
                }
            }
        }catch(ParseException e){
            LOGGER.info("Exception de tiempo");
            LOGGER.info(e.getMessage());
        }
        return res;
    }

    private void updateUTCHour(String asset) {
        UTC_HOUR = Util.getHoursToUTC("America/Monterrey").intValue();
        Optional<Asset> assets = assetRepository.findById(Integer.parseInt(asset));
        if(assets.isPresent())
        {
            UTC_HOUR = Util.getHoursToUTC(assets.get().getTimezone()).intValue();
        }

    }

    @Transactional(readOnly = true)
    public PrimaryIndicatorsDTO getKPIS(Date start, Date end, Date historicStart,Date historicEnd, String assets, String tools ){
        PrimaryIndicatorsDTO kpi = new PrimaryIndicatorsDTO();
        try{
            StoredProcedureQuery sp = em.createStoredProcedureQuery("admin.getKPIs");
            String queryHistoric = "EXEC admin.getKPIsHistoric ?,?,?,?";

            Query query = em.createNativeQuery(queryHistoric);
            query.setParameter(1,historicStart);
            query.setParameter(2,historicEnd);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listArea = query.getResultList();
            List<HistoricDTO> respHist = new ArrayList<>();


            for(Object[]t : listArea){
                HistoricDTO dp = new HistoricDTO();

                dp.setStartAt((String)t[0]);
                dp.setEndAt((String)t[1]);
                dp.setStroke((BigDecimal)t[2]);
                dp.setPotentials((BigDecimal)t[3]);
                dp.setTnd((BigDecimal)t[4]);
                dp.setOaxpr((BigDecimal)t[5]);
                dp.setVcd((BigDecimal)t[6]);
                dp.setVsd((BigDecimal)t[7]);
                dp.setDayProduction((String)t[8]);
                respHist.add(dp);

            };

            sp.registerStoredProcedureParameter("startDate", Date.class, ParameterMode.IN);
            sp.registerStoredProcedureParameter("endDate", Date.class, ParameterMode.IN);
            sp.registerStoredProcedureParameter("assets", String.class, ParameterMode.IN);
            sp.registerStoredProcedureParameter("tools", String.class, ParameterMode.IN);
            sp.registerStoredProcedureParameter("OAxPR", BigDecimal.class, ParameterMode.OUT);
            sp.registerStoredProcedureParameter("Goal", BigDecimal.class, ParameterMode.OUT);
            sp.registerStoredProcedureParameter("Strokes", Integer.class, ParameterMode.OUT);
            sp.registerStoredProcedureParameter("Potential", Integer.class, ParameterMode.OUT);
            sp.registerStoredProcedureParameter("VCD", BigDecimal.class, ParameterMode.OUT);
            sp.registerStoredProcedureParameter("VSD", BigDecimal.class, ParameterMode.OUT);



            sp.setParameter("startDate", start);
            sp.setParameter("endDate", end);

            sp.setParameter("assets",assets);
            sp.setParameter("tools", tools);
            sp.execute();

            kpi.setOaxpr((BigDecimal)sp.getOutputParameterValue("OAxPR"));
            kpi.setOaxprGoal((BigDecimal)sp.getOutputParameterValue("Goal"));
            kpi.setStrokesNumber((Integer)sp.getOutputParameterValue("Strokes"));
            kpi.setStrokeGoal((Integer)sp.getOutputParameterValue("Potential"));
            kpi.setVcd((BigDecimal)sp.getOutputParameterValue("VCD"));
            kpi.setVsd((BigDecimal)sp.getOutputParameterValue("VSD"));
            kpi.setHistoric(respHist);
        }catch(Exception e){
            LOGGER.info("Error SP getKPIS: " + e.getMessage());
        }
        return kpi;
    }
    
    @Transactional(readOnly = true)
    public DowntimeDTO getKPIsDowntime(Date start, Date end,Date historicStart, Date historicEnd, String assets, String tools ){
        DowntimeDTO result = new DowntimeDTO();
        try{
            String getDowntimebyTools = "EXEC admin.getDowntimebyTools ?,?,?,?";
            String getAffectationByDepartmentHistoric = "EXEC admin.getAfectationByDepartmentHistoric ?,?,?,?";
            String getAffectationByDepartment = "EXEC admin.getAffectationByDepartmentDetail ?,?,?,?";
            String getDowntimeByToolsHistoric = "EXEC admin.getDowntimebyToolsHistoric ?,?,?,?";
            String getAffectationsByTools = "EXEC admin.getAffectationsByTools ?,?,?,?";
            String getMTTRByDepartment = "EXEC admin.getMTTRbyDepartment ?,?,?,?";

            Query query = em.createNativeQuery(getDowntimebyTools);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listDTTools = query.getResultList();
            query = em.createNativeQuery(getAffectationByDepartment);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listADeparment = query.getResultList();
            query = em.createNativeQuery(getAffectationByDepartmentHistoric);
            query.setParameter(1,historicStart);
            query.setParameter(2,historicEnd);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listADeparmentHist = query.getResultList();
            query = em.createNativeQuery(getAffectationsByTools);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listATools = query.getResultList();
            query = em.createNativeQuery(getMTTRByDepartment);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listMTTRDepartment = query.getResultList();
            query = em.createNativeQuery(getDowntimeByToolsHistoric);
            query.setParameter(1,historicStart);
            query.setParameter(2,historicEnd);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listDTToolsHistoric = query.getResultList();
            List<MTTRDto> mttrs = new ArrayList<>();
            List<DepartmentDTO> dps = new ArrayList<>();
            List<DepartmentDTO> dpsHist = new ArrayList<>();
            List<WorkOrderDTO> wkds = new ArrayList<>();
            List<WorkOrderDTO> wkdsHist = new ArrayList<>();
            List<Map<String,String>> respToolsHistoric = new ArrayList<>();
            listDTTools.stream().forEach((t) -> {
                result.setDt((BigDecimal)t[0]);
                result.setDtGoal((BigDecimal)t[1]);
            });
            for(Object[]t : listADeparmentHist){
                DepartmentDTO dp = new DepartmentDTO();

                dp.setId((Integer)t[0]);
                dp.setDescripcion((String)t[1]);
                dp.setShortDesc((String)t[2]);
                dp.setColor((String)t[3]);
                dp.setAffect((BigDecimal)t[4]);
                dp.setMinutes((BigDecimal)t[5]);
                dp.setTnd((BigDecimal)t[6]);
                dp.setValue((BigDecimal)t[7]);
                dp.setQuantity((Integer)t[8]);
                dp.setCode((String)t[9]);
                dpsHist.add(dp);

            };
            for(Object[]t : listADeparment){ //Cambio.
                DepartmentDTO dp = new DepartmentDTO();

                dp.setId((Integer)t[0]);
                dp.setDescripcion((String)t[1]);
                dp.setShortDesc((String)t[2]);
                dp.setColor((String)t[3]); // colorByArea((String)t[2], (BigDecimal)t[7])
                dp.setAffect((BigDecimal)t[4]);
                dp.setMinutes((BigDecimal)t[5]);
                dp.setTnd((BigDecimal)t[6]);
                dp.setValue((BigDecimal)t[7]);
                dp.setQuantity((Integer)t[8]);
                dp.setWo((BigInteger)t[9]);
                dp.setDtCode((String)t[10]);
                
                dps.add(SerializationUtils.clone(dp));
                
            };
            for(Object[]t : listDTToolsHistoric){
                Map<String,String> values = new TreeMap<>();
                values.put("dayProduction",(String)t[0]);
                values.put("downtime",((BigDecimal)t[1]).toString());
                values.put("goalDowntime",((BigDecimal)t[2]).toString());
                respToolsHistoric.add(values);
            };
            BigDecimal aux = new BigDecimal(0);
            for (Object[] t : listATools){
                WorkOrderDTO dp = new WorkOrderDTO();
                dp.setWoid((BigInteger)t[0]);
                dp.setId((BigInteger)t[1]);
                dp.setDtCode((String)t[2]);
                dp.setDescIssue((String)t[3]);
                dp.setToolID((BigInteger)t[4]);
                dp.setDescTool((String)t[5]);
                dp.setStart((Date)t[6]);
                dp.setEndAt((Date)t[7]);
                dp.setDowntimeSeconds((Double)t[8]);
                dp.setQuantityDowntimes((Integer)t[9]);
                dp.setTotalTime((Double)t[10]);
                dp.setTimeOut((Double)t[11]);
                dp.setTnd((Double)t[12]);
                dp.setDowntimePercentage((BigDecimal)t[13]);
                wkdsHist.add(dp);
                int ind = wkds.indexOf(dp);
                if(ind>= 0){
                    WorkOrderDTO wo = wkds.get(ind);
                    aux.add(wo.getDowntimePercentage());
                    aux.add(dp.getDowntimePercentage());
                    wo.setDowntimeSeconds(wo.getDowntimeSeconds()+dp.getDowntimeSeconds());
                    wo.setDowntimePercentage(aux);
                    aux = BigDecimal.ZERO;
                }else{
                    wkds.add(SerializationUtils.clone(dp));
                }

            };
            for(Object[] t : listMTTRDepartment){
                MTTRDto dp = new MTTRDto();

                dp.setId((Integer)t[0]);
                dp.setDescription((String)t[1]);
                dp.setMinutes((BigDecimal)t[2]);
                dp.setEvents((Integer)t[3]);
                dp.setDtMin((BigDecimal)t[4]);
                dp.setDtMax((BigDecimal)t[5]);
                dp.setIssueCode((String)t[6]);
                dp.setDurationIssue((BigDecimal)t[7]);
                dp.setTnd((BigDecimal)t[8]);
                dp.setMttr((BigDecimal)t[9]);
                dp.setAffect((BigDecimal)t[10]);
                dp.setShortDesc((String)t[11]);
                dp.setColor((String)t[12]);
                dp.setListErrorCode(dp.getListErrorCode().concat(dp.getIssueCode()+ " : "+ dp.getDurationIssue()+ " min, "));
                int ind = mttrs.indexOf(dp);
                
                if(ind>= 0){
                    MTTRDto mt = mttrs.get(ind);
                    mt.setListErrorCode(mt.getListErrorCode().concat(dp.getIssueCode()+ " : "+ dp.getDurationIssue()+ " min, "));
                }else{
                    mttrs.add(SerializationUtils.clone(dp));
                }

            };
            result.setMttr(mttrs);
            List<Map<String,Object>> trasnfTool = transformToGraphTools(wkdsHist);
            result.setAfectacionPorHerramientaHistoric(trasnfTool);
            List<Map<String,Object>> auxNew = transformTop5(trasnfTool);
            result.setAfectacionPorHerramienta(auxNew.size()>5 ? auxNew.subList(0, 5) : auxNew);
            result.setAfectacionPorDepartamento(transformToAfectationByDepartment(dps)); //Changed transformToAfectationByDepartment
            result.setAfectacionPorDepartamentoHist(dpsHist);
            result.setDowntimePorHerramientaHistoric(respToolsHistoric);
        }catch(Exception e){
            LOGGER.info("Error getKpisDowntime: ");
            e.printStackTrace();
        }
        return result;
    }
    
    public List<Map<String,Object>> transformToGraphTools(List<WorkOrderDTO> list){
        List<Map<String,Object>> respuesta = new ArrayList<>();
        list.stream().forEach((wo) -> {
            boolean isNew = true;
            Map<String,Object> cont = new TreeMap<>();
            Map<String,Object> meta = new TreeMap<>();
            for (Map<String, Object> t : respuesta) {
                if(((String)t.get("descTool")).equalsIgnoreCase(wo.getDescTool())){
                    isNew = false;
                    cont = (Map<String,Object>)t;
                    meta = (Map<String,Object>)cont.get("meta");
                }
            }
            cont.put(wo.getDtCode(),wo.getDowntimePercentage());
            Map<String,Object> datos = new TreeMap<>();
            datos.put("CANTIDAD", wo.getQuantityDowntimes());
            datos.put("COLOR", wo.getDowntimePercentage().doubleValue()>= 85 ? GREEN_INDICATOR_COLOR : RED_INDICATOR_COLOR);
            datos.put("DOWNTIME", wo.getDowntimePercentage());
            datos.put("MINUTOS", wo.getDowntimeSeconds()/60);
            meta.put(wo.getDtCode(), datos);
            cont.put("meta",meta);
            if(isNew){
                cont.put("descTool",wo.getDescTool());
                cont.put("none",0);
                respuesta.add(cont);
            }
        });
        return respuesta;
    }
    
    public List<Map<String,Object>> transformToAfectationByDepartment(List<DepartmentDTO> list){
        List<Map<String,Object>> respuesta = new ArrayList<>();
        list.stream().forEach((wo) -> {
            boolean isNew = true;
            Map<String,Object> cont = new TreeMap<>();
            Map<String,Object> meta = new TreeMap<>();
            for (Map<String, Object> t : respuesta) {
               
                if(((String)t.get("departmen")).equalsIgnoreCase(wo.getShortDesc())){
                    
                    isNew = false;
                    cont = (Map<String,Object>)t;
                    meta = (Map<String,Object>)cont.get("meta");
                }
            }
            if(cont.get(wo.getDtCode()) != null){
                //Actualizo
                BigDecimal value = (BigDecimal) cont.get(wo.getDtCode());
                cont.put(wo.getDtCode(),wo.getValue().add(value));

                Map<String, Object> datos = new TreeMap<>();
                datos = (TreeMap<String, Object>) meta.get(wo.getDtCode());

                Integer cantidadActual = (Integer) datos.get("CANTIDAD");
                BigDecimal actualMinutes = (BigDecimal) datos.get("MINUTOS");


                datos.put("CANTIDAD",  cantidadActual + wo.getQuantity());
                datos.put("DOWNTIME", wo.getValue().add(value));
                datos.put("MINUTOS", wo.getMinutes().add(actualMinutes));


            }else {
                cont.put(wo.getDtCode(), wo.getValue());
                //cont.put("COLOR",wo.getColor());
                Map<String, Object> datos = new TreeMap<>();
                datos.put("CANTIDAD", wo.getQuantity());
                //datos.put("COLOR", wo.getDowntimePercentage().doubleValue()>= 85 ? GREEN_INDICATOR_COLOR : RED_INDICATOR_COLOR);
                datos.put("DOWNTIME", wo.getValue());
                datos.put("MINUTOS", wo.getMinutes());
                //datos.put("DtCode", wo.getDtCode());
                meta.put(wo.getDtCode(), datos);
                cont.put("meta", meta);
            }


            if(isNew){
                //System.out.println("Soy nuevo " + wo.getShortDesc());
                cont.put("departmen",wo.getShortDesc());
                cont.put("none",0);
                respuesta.add(cont);
            }
        });
        
        
        return respuesta;
    }
    
    public List<Map<String,Object>> transformCoByToolGraph(List<COToolDTO> list){ //aqui va el event
       List<Map<String,Object>> respuesta = new ArrayList<>();
        list.stream().forEach((wo) -> {
            boolean isNew = true, isNewDepartment = false;
           
            Map<String,Object> cont = new TreeMap<>();
            Map<String,Object> meta = new TreeMap<>();
            for (Map<String, Object> t : respuesta) {            
                if(((String)t.get("toolId")).equalsIgnoreCase(wo.getToolId())){
                    isNew = false;
                    cont = (Map<String,Object>)t;
                    Map<String,Object> datosAux = new TreeMap<>();
                    meta = (Map<String,Object>)cont.get("meta");
                    BigDecimal auxVar ;
                     for (Map.Entry<String,Object> entry : meta.entrySet())
                     {
                        if(wo.getDesDepartment().equals(entry.getKey()))
                        {
                            isNewDepartment = true;
                             auxVar = (BigDecimal) ( (TreeMap) meta.get(wo.getDesDepartment())).get("TIEMPO");    
                             ((TreeMap) meta.get(wo.getDesDepartment())).put("TIEMPO", (auxVar) == null ? wo.getAvgDepartment(): (auxVar).add( wo.getAvgDepartment()));
                             
                             cont.put(wo.getDesDepartment(), ((TreeMap) meta.get(wo.getDesDepartment())).get("TIEMPO"));
                        }         
                     }
                    cont.put("total", ((BigDecimal)cont.get("total")) == null ? wo.getAvgDepartment(): ((BigDecimal)cont.get("total")).add( wo.getAvgDepartment()));
                }
            }
            if(!isNewDepartment){
                cont.put(wo.getDesDepartment(),wo.getAvgDepartment());
                Map<String,Object> datos = new TreeMap<>();
                datos.put("CANTIDAD", wo.getEventByTool());
                datos.put("COLOR", departamentoColores.get(wo.getDesDepartment()));
                datos.put("TIEMPO", wo.getAvgDepartment());
                datos.put("EVENT", wo.getEvent());
                meta.put(wo.getDesDepartment(), datos);
                cont.put("meta",meta);
                if(isNew){
                    cont.put("total", wo.getAvgDepartment());
                    cont.put("toolId",wo.getToolId());
                    cont.put("none",0);

                    respuesta.add(cont);
                }
            }
        });
        return respuesta;
    }
    
    public Date getTimeZone(String plant, Date date){
        
        DateFormat formatterUTC = new SimpleDateFormat();
        formatterUTC.setTimeZone(TimeZone.getTimeZone("UTC")); // UTC timezone
        Date res = null;
        try{
            res = formatterUTC.parse(formatterUTC.format(date));
        }catch(ParseException e){
            System.out.println("Error fechas");
        }
        
        return res;
    }

    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/downtimes/{startAt}/{endAt}/{asset}/{tool}", method = RequestMethod.GET)
    public DowntimeDTO getDowntimes(@PathVariable("plant") String plant,
                                           @PathVariable("startAt") String startAt, @PathVariable("endAt") String endAt,
                                           @PathVariable("asset") String asset, @PathVariable("tool") String tool) {
        System.out.println("Attending KPI Dashboard Downtime Indicators");
        DateUTC fechas;
        if(startAt.equals("lastProductionDay")){
            Map<String,String> lastDate = getLastProductiveDay(plant);
            startAt = lastDate.get("lastProductiveDay");
            endAt = lastDate.get("lastProductiveDay");
        }
        fechas =  getAssetDate(startAt, endAt, asset);
        DowntimeDTO res = getKPIsDowntime(fechas.getStart(),fechas.getEnd(), fechas.getFirstDayDate(),fechas.getLastDayDate(), asset,tool);

        return res;
    }
    
    @Transactional(readOnly = true)
    public ChangeOverDTO getKPIsChangeover(Date start, Date end, Date historicStart, String assets, String tools ){
        ChangeOverDTO result = new ChangeOverDTO();
        try{
            String getCOAveragebyTools = "EXEC admin.getCOAveragebyTools ?,?,?,?";
            String getCOByArea = "EXEC admin.getCOByArea ?,?,?,?";
            String getCOByTool = "EXEC admin.getCOByTool ?,?,?,?"; //aqui nuev event
            String getCOByToolHistoric = "EXEC admin.getCOByToolHistoric ?,?,?,?";

            Query query = em.createNativeQuery(getCOAveragebyTools);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listAvgTools = query.getResultList();
            query = em.createNativeQuery(getCOByArea);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listArea = query.getResultList();
            query = em.createNativeQuery(getCOByTool);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listTool = query.getResultList();
            query = em.createNativeQuery(getCOByToolHistoric);
            query.setParameter(1,historicStart);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listToolHistoric = query.getResultList();

            List<COAreaDTO> respAreas = new ArrayList<>();
            List<COToolDTO> respTools = new ArrayList<>();
            List<Map<String,String>> respToolsHistoric = new ArrayList<>();

            listAvgTools.stream().forEach((t) -> {
                result.setTime((BigDecimal)t[0]);
                result.setNumber((BigDecimal)t[1]);
                result.setAverage((BigDecimal)t[2]);
                result.setGoal((BigDecimal)t[3]);
            });
            for(Object[]t : listArea){
                COAreaDTO dp = new COAreaDTO();

                dp.setDescription((String)t[0]);
                dp.setAverage((BigDecimal)t[1]);
                dp.setMinutes((BigDecimal)t[2]);
                dp.setEvent((Integer)t[3]);
                dp.setColor(departamentoColores.get(dp.getDescription()));
                respAreas.add(dp);

            };
            for (Object[] t : listTool){
                COToolDTO dp = new COToolDTO();
                dp.setToolId((String)t[0]);
                dp.setEventByTool((Integer)t[1]);
                dp.setDesDepartment((String)t[2]);
                dp.setAvgDepartment((BigDecimal)t[3]);
                dp.setMinutesDepartment((BigDecimal)t[4]);
                dp.setEvent((Integer)t[5]);
                
                respTools.add(dp);

            };
            for (Object[] t : listToolHistoric){
                Map<String,String> values = new TreeMap<>();
                values.put("chart", (String)t[0]);
                values.put("value", ((BigDecimal)t[2]).toString());
                values.put("dayProduction",(String)t[1]);
                respToolsHistoric.add(values);

            };

            
            result.setTiempoCoPorDepartamento(respAreas);
            List<Map<String,Object>> trans = transformCoByToolGraph(respTools);
            result.setChangeoverPorHerramienta(trans);
            result.setEvents(getEventsCO(trans));
            result.setHistoric(respToolsHistoric);
        }catch(Exception e){
            LOGGER.info("Error getKpisChangeover: "+e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/changeover/{startAt}/{endAt}/{asset}/{tool}", method = RequestMethod.GET)
    public ChangeOverDTO getKpiChangeOverGraphs(@PathVariable("plant") String plant,
                                                @PathVariable("startAt") String startAt, @PathVariable("endAt") String endAt,
                                                @PathVariable("asset") String asset, @PathVariable("tool") String tool) {
        System.out.println("Attending KPI Dashboard Changeover");
        DateUTC fechas;
        if(startAt.equals("lastProductionDay")){
            Map<String,String> lastDate = getLastProductiveDay(plant);
            startAt = lastDate.get("lastProductiveDay");
            endAt = lastDate.get("lastProductiveDay");
        }
        fechas =  getAssetDate(startAt, endAt, asset);
        ChangeOverDTO res = getKPIsChangeover(fechas.getStart(),fechas.getEnd(), fechas.getFirstDayDate(), asset,tool);

        return res;
    }


    
    @Transactional(readOnly = true)
    public ProductivityDTO getHxH(Date start, Date end, String assets, String tools ){
        
        ProductivityDTO result = new ProductivityDTO();
        try{
            String getCOAveragebyTools = "EXEC admin.getKPIsHxH ?,?,?,?";
            Query query = em.createNativeQuery(getCOAveragebyTools);
            query.setParameter(1,start);
            query.setParameter(2,end);
            query.setParameter(3,assets);
            query.setParameter(4,tools);
            List<Object[]> listAvgTools = query.getResultList();


            List<BarDTO> respHxH = new ArrayList<>();
            List<BarDTO> respHxHSorted = new ArrayList<>();



            for (Object[] t : listAvgTools){
                BarDTO bar = new BarDTO();
                bar.setDate((String)t[0]);
                bar.setValue((Integer)t[2]);
                bar.setGoal((BigDecimal)t[3]);
                String aux = "", toolsAux = "";
                aux = (String)t[5];
                String[] toolsPart = aux.split(",");
                int count = 0;
                for (String part : toolsPart) {
                    if(count < 10)
                    {
                        toolsAux = toolsAux + part + ",";
                        count++;
                    }else{
                        toolsAux = toolsAux + part + ",<br>";
                        count=0;
                    }
                }
                
                bar.setTools(toolsAux);
                
                Double perc = (100 / bar.getGoal().doubleValue()) * bar.getValue();
                bar.setColor(perc >= 85 ? BLUE_INDICATOR_COLOR : RED_INDICATOR_COLOR);
                String minutos = bar.getDate().substring(3, bar.getDate().length());
                updateUTCHour(assets);
                int hora = Integer.parseInt(bar.getDate().substring(0, 2)) - UTC_HOUR;
                bar.setDate(String.valueOf(hora < 0 ? 24+hora : hora)+":"+minutos);
                respHxH.add(bar);

            };
           
            for(BarDTO o : respHxH){
                if(o.getDate().compareTo(INICIO_TURNO_APODACA)>=0){
                    respHxHSorted.add(o);
                }
            }
            for(BarDTO o : respHxH){
                if(o.getDate().compareTo(INICIO_TURNO_APODACA)<0){
                    respHxHSorted.add(o);
                }
            }
                    
            result.setGraphicData(respHxHSorted);
        }catch(Exception e){
            LOGGER.info("Error getHxH: "+e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
    
    /**
     *
     * @param plant
     * @param startAt
     * @param endAt
     * @param asset
     * @param tool
     * @return
     */
    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/hxh/{startAt}/{endAt}/{asset}/{tool}", method = RequestMethod.GET)
    public ProductivityDTO getKpiHxH(@PathVariable("plant") String plant,
                                           @PathVariable("startAt") String startAt, @PathVariable("endAt") String endAt,
                                           @PathVariable("asset") String asset, @PathVariable("tool") String tool) {
        System.out.println("Attending KPI Dashboard Productivity");
        if(startAt.equals("lastProductionDay")){
            Map<String,String> lastDate = getLastProductiveDay(plant);
            startAt = lastDate.get("lastProductiveDay");
            endAt = lastDate.get("lastProductiveDay");
        }
        DateUTC fechas;
        fechas =  getAssetDate(startAt, endAt, asset);
        ProductivityDTO res = getHxH(fechas.getStart(),fechas.getEnd(),asset,tool);
        return res;
    } 
    

    @Transactional(readOnly = true)
    public Integer getTND(String plant, LocalDateTime startAt, LocalDateTime endAt, List<Asset> assets, List<Tool> tools ){

        Map<String, LocalDateTime> dateRange = new HashMap<>();

        dateRange.put("ini",startAt);
        dateRange.put("fin",endAt);


        StoredProcedureQuery sp = em.createStoredProcedureQuery("admin.getTNDTools");

        //em.getTransaction().begin();

        sp.registerStoredProcedureParameter("startDate", LocalDateTime.class, ParameterMode.IN);
        sp.registerStoredProcedureParameter("endDate", LocalDateTime.class, ParameterMode.IN);
        sp.registerStoredProcedureParameter("assets", String.class, ParameterMode.IN);
        sp.registerStoredProcedureParameter("tools", String.class, ParameterMode.IN);
        sp.registerStoredProcedureParameter("tnd", String.class, ParameterMode.OUT);


        sp.setParameter("startDate", dateRange.get("ini"));
        sp.setParameter("endDate", dateRange.get("fin"));
        sp.setParameter("assets",
                assets.stream().map(t -> t.getId().toString()).collect(Collectors.joining(","))
        );
        sp.setParameter("tools",
                tools.stream().map(t -> t.getId().toString()).collect(Collectors.joining(","))
        );
        String tnd;
        sp.execute();

        tnd = (String) sp.getOutputParameterValue("tnd");

        //em.getTransaction().commit();
        //em.close();


        return Integer.valueOf(tnd);
    }


    public  List<HistoricDTO> historicTND(String plant, String startAt, String endAt, String asset, String tool){
        List<HistoricDTO> result = new ArrayList<>();

        Map<String, LocalDateTime> fechas = historicInitDateRange(plant, startAt, endAt);


        LocalDateTime i ;
        


        return result;
    }

    

    /**
     *
     *
     * @return Retorna el start date dependiendo de sí se trata de un solo día o de un rango de día
     */
    public Map<String,LocalDateTime> historicInitDateRange(String plant, String startAt, String endAt){
//        LocalDateTime start = LocalDate.parse(startAt).atTime(HOUR_START_PLANT,0);
//        LocalDateTime end = LocalDate.parse(endAt).atTime(HOUR_START_PLANT-1, 59,59).plusDays(1);

        Map<String, LocalDateTime> result = new HashMap<>();

        Map<String, ZonedDateTime> zonedDates = this.getProductiveZonedDates(plant, startAt, endAt);

        if(sameDay(startAt,endAt)){
            result.put("ini",zonedDates.get("ini").toLocalDateTime().withDayOfMonth(1));
            result.put("iniOri",zonedDates.get("ini").toLocalDateTime());
            //result.put("fin",end.plu);
            //return end.withDayOfMonth(1);
        }else{
            result.put("ini",zonedDates.get("ini").toLocalDateTime());
        }
        result.put("fin",zonedDates.get("fin").toLocalDateTime());


        return result;
    }

    public Map<String, ZonedDateTime> getProductiveZonedDates( String plant, String start, String end){
        Map<String, ZonedDateTime> resultMap = new HashMap<>();
        //LocalDateTime yesterday = LocalDateTime.now();
        ZonedDateTime zonedDT;

        if(plant.toUpperCase().equals("APODACA")){
            zonedDT = ZonedDateTime.now(ZoneId.of("America/Monterrey"));


            resultMap.put("ini",ZonedDateTime.of(LocalDate.parse(start), LocalTime.MIN, ZoneId.of("America/Monterrey")));
            resultMap.put("fin",ZonedDateTime.of(LocalDate.parse(end), LocalTime.MAX, ZoneId.of("America/Monterrey")));
//            if(zonedDT.getHour() < 5 )
//                yesterday = zonedDT.toLocalDateTime().minusDays(2);
//            else
//                yesterday = zonedDT.toLocalDateTime().minusDays(1);

        }else if(plant.toUpperCase().equals("ETOWN")){
            // Lógica de ETOWN
            zonedDT = ZonedDateTime.now(ZoneId.of("America/New_York"));
            resultMap.put("ini",ZonedDateTime.of(LocalDate.parse(start), LocalTime.MIN, ZoneId.of("America/New_York")));
            resultMap.put("fin",ZonedDateTime.of(LocalDate.parse(end), LocalTime.MAX, ZoneId.of("America/New_York")));
//            if(zonedDT.getHour() < 10 )
//                yesterday = zonedDT.toLocalDateTime().minusDays(2);
//            else
//                yesterday = zonedDT.toLocalDateTime().minusDays(1);
        }else{
            resultMap.put("ini",ZonedDateTime.now(ZoneId.of("America/New_York")).minusDays(2));
            resultMap.put("fin",ZonedDateTime.now(ZoneId.of("America/New_York")).minusDays(1));
        }

        return resultMap;
    }



    private boolean sameDay(String startAt, String endAt){
        if(LocalDate.parse(startAt).equals(LocalDate.parse(endAt)))
            return true;
        return false;
    }


   

    private List<ToolsDataSet> getTNDToolsSet(String plant, String startAt, String endAt, String assets, String tools, boolean sameDay) {


        String nativeQuery = "EXEC admin.getTNDToolsSet ?,?,?,?";

        Query query = em.createNativeQuery(nativeQuery);
        query.setParameter(1,startAt);
        query.setParameter(2,endAt);
        query.setParameter(3,assets);
        query.setParameter(4,tools);

        List<Object[]> list = query.getResultList();

        List<ToolsDataSet> result = new ArrayList<>();

        for(Object[] o : list){

            ToolsDataSet tool = new ToolsDataSet();

            tool.setToolId((Integer) o[0]);
            tool.setTnd((Integer) o[1]);
            tool.setGoal((BigDecimal) o[2]);
            result.add(tool);

        }

        return result;
    }

    
    public List<Asset> getAssets(String asset){

        List<Asset> result = new ArrayList<>();

        if(asset.toUpperCase().equals("TODAS")){
            result = assetRepository.findAll();
        }else if(Util.stringContainsNumber(asset.trim())){
            Optional<Asset> optional = assetRepository.findById(Integer.valueOf(asset.trim()));

            if(optional.isPresent())
                result.add(optional.get());
        }

        if(result.isEmpty()){
            result.add(assetRepository.findAll().get(0));
        }

        return result;
    }
    

    public List<Tool> getToolsByDateRangeAndAsset(String plant, String startAt, String endAt, String asset, Boolean sameDay){

        //Map<String, LocalDateTime> dateRange = historicInitDateRange(plant, startAt, endAt);
        LocalDateTime ini =  null;
        LocalDateTime end =   null;
          
        if(plant.equalsIgnoreCase("apodaca"))
        {
          ini =   Util.stringToLocalDateTime(startAt + " 11:00:00.000", Util.DATETIME_SQL);
          end =   Util.stringToLocalDateTime(endAt+ " 10:59:59.000", Util.DATETIME_SQL);
          
        }else if(plant.equalsIgnoreCase("etown")){
            ini =   Util.stringToLocalDateTime(startAt + " 02:30:00.000", Util.DATETIME_SQL);
            end =   Util.stringToLocalDateTime(endAt+ " 02:29:59.000", Util.DATETIME_SQL);
            //otro boleto
            //end = end.plusDays(1);
        }
        //if(end.isBefore(ini))


        return this.getToolsByDateRangeAndAsset(plant, ini, end, asset);
    }

    public List<Tool> getToolsByDateRangeAndAsset(String plant, LocalDateTime startAt, LocalDateTime endAt, String asset){

        List<WorkOrder> wo = workOrderRepository.findByStartAtGreaterThanEqualAndEndAtLessThanEqualAndAssetInAndToolNotNull(startAt, endAt, getAssets(asset));

        List<Tool> result = new ArrayList<>();

        for(WorkOrder w : wo){
            if(!result.contains(w.getTool()) && w.getOpenSecond()>0)
                result.add(w.getTool());
        }

        return result;
    }

    /**
     *
     * @return Retorna las herramientas disponibles dados las condiciones de fecha inico, fecha fin y el asset
     */
    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/tools/{startAt}/{endAt}/{asset}", method = RequestMethod.GET)
    public List<CatalogDTO> getTools(@PathVariable("plant") String plant, @PathVariable("startAt") String startAt, @PathVariable("endAt") String endAt, @PathVariable("asset") String asset){
        if(startAt.equals("lastProductionDay")){
            Map<String,String> lastDate = getLastProductiveDay(plant);
            startAt = lastDate.get("lastProductiveDay");
            endAt = lastDate.get("lastProductiveDay");
        }
        DateUTC fechas =  getAssetDate(startAt, endAt, asset);
        
        startAt = Util.dateToString(fechas.getStart());
        endAt = Util.dateToString(fechas.getEnd());
        
        List<Tool> result = getToolsByDateRangeAndAsset(plant, startAt, endAt, asset, true);

        return result
                .stream().map(t -> new CatalogDTO(t.getId(),t.getDescTool()))
                .collect(Collectors.toList()); //.collect(Collectors.toMap(Tool::getId,Tool::getDescTool));
    }


    // Retorna el último día productivo
    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/lastProductiveDay", method = RequestMethod.GET)
    public Map<String, String> getLastProductiveDay(@PathVariable("plant") String plant){
        String result;
        Map<String, String> resultMap = new HashMap<>();
        LocalDateTime yesterday = LocalDateTime.now();
        ZonedDateTime today = ZonedDateTime.now();
        ZonedDateTime zonedDT;
        if(plant.toUpperCase().equals("APODACA")){
            zonedDT = today.withZoneSameInstant(ZoneId.of("America/Monterrey"));
            if(zonedDT.getHour() < 5 )
                yesterday = zonedDT.toLocalDateTime().minusDays(2);
            else
                yesterday = zonedDT.toLocalDateTime().minusDays(1);

        }else if(plant.toUpperCase().equals("ETOWN")){
            // Lógica de ETOWN
            zonedDT = today.withZoneSameInstant(ZoneId.of("America/New_York"));
            if(zonedDT.toLocalTime().toSecondOfDay() < 10.5*60*60 )
                yesterday = zonedDT.toLocalDateTime().minusDays(2);
            else
                yesterday = zonedDT.toLocalDateTime().minusDays(1);
        }else{
            yesterday = null;
        }

        if (yesterday != null)
            result = yesterday.toLocalDate().toString();
        else
            result = "";

        //result = LocalDate.now().withDayOfMonth(3).toString();

        resultMap.put("lastProductiveDay", result); //result

      return resultMap;
    }


    


    // Assets de la planta
    @Transactional(readOnly = true)
    @RequestMapping(path = "{plant}/assets", method = RequestMethod.GET)
    public List<CatalogDTO> getAvailableAssets(@PathVariable("plant") String plant){
        List<CatalogDTO> result = new ArrayList<CatalogDTO>();
        
        List<Asset> assets = assetRepository.findAll();
        
        for (Asset a : assets)
        {
            result.add(new CatalogDTO(a.getId(),a.getDescription()));
        }
        /*result = assets.stream()
                .map(a -> new CatalogDTO(a.getId(),nameAssets.get(a.getName())))
                .collect(Collectors.toList());*/

        return result;
    }

    
    public String colorByArea(String area, BigDecimal value){
    
        String colorAux = null;
    
        switch (area) {
            
            case "OP":
                colorAux = (value.compareTo(new BigDecimal(4.10)) == 1  ? "#D31D00" : "#008A00" );
                break;
            case "MTO":
                colorAux = (value.compareTo(new BigDecimal(2.20)) == 1 ? "#D31D00" : "#008A00" );
                break;
            case "HTA":
                colorAux = (value.compareTo(new BigDecimal(2.80)) == 1 ? "#D31D00" : "#008A00" );
                break;
            case "CAL":
                colorAux = (value.compareTo(new BigDecimal(0.20)) == 1 ? "#D31D00" : "#008A00" );
                break;
            case "LOG":
                colorAux = (value.compareTo(new BigDecimal(0.30)) == 1 ? "#D31D00" : "#008A00" );
                break;
                    
        
        }
        
        return colorAux;
    }

   
    private List<Map<String, Object>> transformTop5(List<Map<String, Object>> trasnfTool) {
        
        trasnfTool.sort((Map<String, Object> el1, Map<String, Object> el2) -> {
            BigDecimal downtime1 = BigDecimal.ZERO, downtime2 = BigDecimal.ZERO;
            Map<String,Object> datos1 = (Map<String,Object>) el1.get("meta");
            Map<String,Object> datos2 = (Map<String,Object>) el2.get("meta");
            for (Map.Entry<String, Object> entry : datos1.entrySet()) {
                //System.out.println(entry.getKey() + "/" + entry.getValue().get("DOWNTIME"));
                Map<String,Object> mark = (Map<String,Object>) entry.getValue();
                downtime1 = downtime1.add((BigDecimal) mark.get("DOWNTIME"));
                
            }

            
            for (Map.Entry<String, Object> entry : datos2.entrySet()) {
                //System.out.println(entry.getKey() + "/" + entry.getValue().get("DOWNTIME"));
                Map<String,Object> mark = (Map<String,Object>) entry.getValue();
                downtime2 = downtime2.add((BigDecimal) mark.get("DOWNTIME"));
                
            }


            return downtime2.compareTo(downtime1);
        });        
        return trasnfTool;
    }

    private List<Integer> getEventsCO(List<Map<String, Object>> trans) {
        List<Integer> events = new ArrayList<>();
        
        trans.sort((Map<String, Object> el1, Map<String, Object> el2) -> {
            BigDecimal event1 = BigDecimal.ZERO, event2 = BigDecimal.ZERO;
            Map<String,Object> datos1 = (Map<String,Object>) el1.get("meta");
            Map<String,Object> datos2 = (Map<String,Object>) el2.get("meta");
            for (Map.Entry<String, Object> entry : datos1.entrySet()) {
               
                Map<String,Object> mark = (Map<String,Object>) entry.getValue();
                event1 = event1.add((BigDecimal) mark.get("TIEMPO"));
                
            }

            
            for (Map.Entry<String, Object> entry : datos2.entrySet()) {
               
                Map<String,Object> mark = (Map<String,Object>) entry.getValue();
                event2 = event2.add((BigDecimal) mark.get("TIEMPO"));
                
            }

            return event2.compareTo(event1);
        });
        
        for (Map<String, Object> tran : trans) {
             Map<String,Object> datos1 = (Map<String,Object>) tran.get("meta");
             
             
             for (Map.Entry<String, Object> entry : datos1.entrySet()) {
               
                Map<String,Object> mark = (Map<String,Object>) entry.getValue();
                events.add((Integer) mark.get("EVENT"));
                break;
                
            }
             
             
        }
        
        
        return events;
        
    }
    
}

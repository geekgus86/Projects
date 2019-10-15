package com.iusa.clases.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name="\"videos\"", schema="CU_CONSULTAE")
public class Videos {
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_videos")
	 @SequenceGenerator(name="sec_videos", sequenceName="sec_videos")
	 @Column(name = "\"id_video\"")
	 	private BigDecimal id_video;
	 @Column(name="\"url_video\"")
	 	private String url_video;
	 @Column(name="\"donde_va\"")
	 	private String donde_va;
	 
	 
	public BigDecimal getId_video() {
		return id_video;
	}
	public void setId_video(BigDecimal id_video) {
		this.id_video = id_video;
	}
	public String getUrl_video() {
		return url_video;
	}
	public void setUrl_video(String url_video) {
		this.url_video = url_video;
	}
	public String getDonde_va() {
		return donde_va;
	}
	public void setDonde_va(String donde_va) {
		this.donde_va = donde_va;
	}

}

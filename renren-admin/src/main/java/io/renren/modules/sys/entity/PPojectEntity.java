package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 项目表
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-08-18 14:40:27
 */
@Data
@TableName("p_poject")
public class PPojectEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private String name;
	/**
	 * 
	 */
	private String keyCode;
	/**
	 * 0正常  1停用
	 */
	private Integer status;
	/**
	 * 
	 */
	private Date createTime;

}

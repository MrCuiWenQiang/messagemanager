package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.PPojectEntity;

import java.util.Map;

/**
 * 项目表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-08-18 14:40:27
 */
public interface PPojectService extends IService<PPojectEntity> {

    PageUtils queryPage(Map<String, Object> params);
}


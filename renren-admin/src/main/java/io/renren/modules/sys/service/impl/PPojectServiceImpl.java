package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.PPojectDao;
import io.renren.modules.sys.entity.PPojectEntity;
import io.renren.modules.sys.service.PPojectService;


@Service("pPojectService")
public class PPojectServiceImpl extends ServiceImpl<PPojectDao, PPojectEntity> implements PPojectService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<PPojectEntity> page = this.page(
                new Query<PPojectEntity>().getPage(params),
                new QueryWrapper<PPojectEntity>()
        );

        return new PageUtils(page);
    }

}
